import { Breadcrumbs } from "~/components/drive/breadcrumbs"
import { Table } from "~/components/drive/table"
import { Toolbar } from "~/components/drive/toolbar"

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <header className="mb-6 space-y-4">
        <Breadcrumbs path={[]} />
        <Toolbar />
      </header>
      <Table folderID="drive" />
    </main>
  )
}
