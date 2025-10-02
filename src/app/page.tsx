"use server"

import { Breadcrumbs } from "~/components/drive/breadcrumbs"
import { Table } from "~/components/drive/table"
import { Toolbar } from "~/components/drive/toolbar"
import { db } from "~/server/db"
import {
  files as filesSchema,
  folders as foldersSchema,
} from "~/server/db/schema"

export default async function HomePage() {
  const files = await db.select().from(filesSchema)
  const folders = await db.select().from(foldersSchema)

  return (
    <main className="mx-auto max-w-6xl p-6">
      <header className="mb-6 space-y-4">
        <Breadcrumbs path={[]} />
        <Toolbar />
      </header>
      <Table files={files} folders={folders} />
      {/* <Table folderID="drive" files={files} folders={folders} /> */}
    </main>
  )
}
