"use client"

import { type DriveFile, type DriveFolder } from "~/lib/mock-drive"
import {
  Table as CTable,
  TableBody,
  TableHead,
  TableRow,
  TableHeader,
} from "~/components/ui/table"
import TableBodyInternal from "./table-body"

type Props = {
  folders: DriveFolder[]
  files: DriveFile[]
  baseHref?: string 
}

export function Table({ baseHref='/drive', folders, files }: Props) {
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
          <TableBodyInternal baseHref={baseHref} folders={folders} files={files} />
        </TableBody>
      </CTable>
    </div>
  )
}
