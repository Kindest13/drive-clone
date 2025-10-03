"use server"

import { Breadcrumbs } from "~/components/drive/breadcrumbs"
import { Table } from "~/components/drive/table"
import { Toolbar } from "~/components/drive/toolbar"
import { QUERIES } from "~/server/db/queries"
import NotFound from "../not-found"

type Props = {
  params: Promise<{ path?: string[] }>
}

export default async function DrivePage({ params }: Props) {
  const path = (await params).path ?? []
  const folderID = parseInt(path.at(-1) ?? "")
  let parents = []

  try {
    parents = await QUERIES.getAllParentsForFolder(folderID)
  } catch {
    return <NotFound />
  }

  const [files, folders] = await Promise.all([
    QUERIES.getFiles(folderID),
    QUERIES.getFolders(folderID),
  ])
  const rootPath = "/drive"
  const baseHref = path.length
    ? `${rootPath}/` + path.join("/")
    : `${rootPath}/1`

  return (
    <main className="mx-auto max-w-6xl p-6">
      <header className="mb-6 space-y-4">
        <Breadcrumbs parents={parents} />
        <Toolbar />
      </header>
      <Table baseHref={baseHref} files={files} folders={folders} />
    </main>
  )
}
