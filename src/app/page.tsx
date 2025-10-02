import { Breadcrumbs } from "~/components/drive/breadcrumbs"
import { Table } from "~/components/drive/table"
import { Toolbar } from "~/components/drive/toolbar"
import { getFolderContent } from "~/lib/mock-data"

export default function HomePage() {
  const { folders, files } = getFolderContent("drive")
  const normalizedPath: string[] = []

  return (
    <main className="mx-auto max-w-6xl p-6">
      <header className="mb-6 space-y-4">
        <Breadcrumbs path={normalizedPath} />
        <Toolbar />
      </header>
      <Table folders={folders} files={files} />
    </main>
  )
}
