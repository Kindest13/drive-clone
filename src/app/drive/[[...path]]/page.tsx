"use server"

import { Breadcrumbs } from "~/components/drive/breadcrumbs"
import { Table } from "~/components/drive/table"
import { Toolbar } from "~/components/drive/toolbar"
import { getFolderIDByPath } from "~/lib/mock-data"

type Props = {
  params: Promise<{ path?: string[] }>
}

export default async function DrivePage({ params }: Props) {
  const path = (await params).path ?? []
  const folderID = getFolderIDByPath(path)

  if (!folderID) {
    return (
      <main className="mx-auto max-w-6xl p-6">
        <header className="mb-6 flex flex-col gap-4">
          <Breadcrumbs path={path} />
          <Toolbar />
        </header>
        <div className="bg-card rounded-md border p-8 text-center">
          <h1 className="text-foreground mb-2 text-lg font-medium">
            Folder not found
          </h1>
          <p className="text-muted-foreground text-sm">
            The folder you’re looking for doesn’t exist or was moved.
          </p>
        </div>
      </main>
    )
  }

  const rootPath = "/drive"
  const baseHref = path.length ? `${rootPath}/` + path.join("/") : rootPath

  return (
    <main className="mx-auto max-w-6xl p-6">
      <header className="mb-6 space-y-4">
        <Breadcrumbs path={path} />
        <Toolbar />
      </header>
      <Table baseHref={baseHref} folderID={folderID} />
    </main>
  )
}
