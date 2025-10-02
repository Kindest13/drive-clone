"use client"

import {
  Table as CTable,
  TableBody,
  TableHead,
  TableRow,
  TableHeader,
} from "~/components/ui/table"
import type {
  folders as foldersSchema,
  files as filesSchema,
} from "~/server/db/schema"
import TableBodyInternal from "./table-body"

type Props = {
  //   folderID: string
  folders: (typeof foldersSchema.$inferSelect)[]
  files: (typeof filesSchema.$inferSelect)[]
  baseHref?: string
}

export function Table({
  baseHref = "/drive",
  //   folderID,
  folders,
  files,
}: Props) {
  return (
    <div className="w-full overflow-x-auto rounded-md border">
      <CTable aria-label="Folder contents table">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60%]">Name</TableHead>
            <TableHead className="w-[20%]">Type</TableHead>
            <TableHead className="w-[20%] text-right">Size</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableBodyInternal
            baseHref={baseHref}
            folders={folders}
            files={files}
          />
        </TableBody>
      </CTable>
    </div>
  )
}
