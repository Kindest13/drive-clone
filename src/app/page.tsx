"use server"

import { Breadcrumbs } from "~/components/drive/breadcrumbs"
import { Table } from "~/components/drive/table"
import { Toolbar } from "~/components/drive/toolbar"
import { QUERIES } from "~/server/db/queries"

const DRIVE_ROOT_FOLDER_ID = 1

export default async function HomePage() {
  const [files, folders] = await Promise.all([
    QUERIES.getFiles(DRIVE_ROOT_FOLDER_ID),
    QUERIES.getFolders(DRIVE_ROOT_FOLDER_ID),
  ])

  return (
    <main className="mx-auto max-w-6xl p-6">
      <header className="mb-6 space-y-4">
        <Breadcrumbs parents={[]} />
        <Toolbar />
      </header>
      <Table files={files} folders={folders} />
    </main>
  )
}
