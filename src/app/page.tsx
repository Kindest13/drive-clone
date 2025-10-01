import { Breadcrumbs } from "~/components/drive/breadcrumbs"
import { Table } from "~/components/drive/table"
import { Toolbar } from "~/components/drive/toolbar"
import { getFolderByPath, splitChildren } from "~/lib/mock-drive"

export default function HomePage() {
  // Show root ("My Drive") contents on the homepage
  const folder = getFolderByPath([])
  const { folders, files } = splitChildren(folder!)
  // Clicking into folders will navigate under /drive/<path>
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
