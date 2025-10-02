"use client"

import { getFolderContent } from "~/lib/mock-data"
import {
  Table as CTable,
  TableBody,
  TableHead,
  TableRow,
  TableHeader,
} from "~/components/ui/table"
import TableBodyInternal from "./table-body"
import { useMemo } from "react"

type Props = {
  folderID: string
  baseHref?: string
}

export function Table({ baseHref = "/drive", folderID }: Props) {
  const { folders, files } = useMemo(
    () => getFolderContent(folderID),
    [folderID],
  )
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
