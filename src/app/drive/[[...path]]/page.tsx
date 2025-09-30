import { Breadcrumbs } from "~/components/drive/breadcrumbs"
import { ItemTable } from "~/components/drive/item-table"
import { Toolbar } from "~/components/drive/toolbar"
import { getFolderByPath, splitChildren } from "~/lib/mock-drive"

type Props = {
  params: Promise<{ path?: string[] }>
}

export default async function DrivePage({
  params,
}: Props) {
  const { path } = await params
  const rawPath = path ?? []
  // rawPath segments are already URL-decoded by Next, but ensure consistent encoding
  const normalized = rawPath.map((seg) => encodeURIComponent(seg))

  const folder = getFolderByPath(
    normalized.map((s) => s), // uses normalized segments
  )

  if (!folder) {
    return (
      <main className="mx-auto max-w-6xl p-6">
        <header className="mb-6 flex flex-col gap-4">
          <Breadcrumbs path={normalized} />
          <Toolbar />
        </header>
        <div className="rounded-md border bg-card p-8 text-center">
          <h1 className="mb-2 text-lg font-medium text-foreground">Folder not found</h1>
          <p className="text-sm text-muted-foreground">The folder you’re looking for doesn’t exist or was moved.</p>
        </div>
      </main>
    )
  }

  const { folders, files } = splitChildren(folder)
  const baseHref = "/drive" + (normalized.length ? "/" + normalized.join("/") : "")

  return (
    <main className="mx-auto max-w-6xl p-6">
      <header className="mb-6 space-y-4">
        <Breadcrumbs path={normalized} />
        <Toolbar />
      </header>
      <ItemTable baseHref={baseHref} folders={folders} files={files} />
    </main>
  )
}
