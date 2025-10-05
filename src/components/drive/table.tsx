"use client"

import {
  Table as CTable,
  TableBody,
  TableHead,
  TableRow,
  TableHeader,
} from "~/components/ui/table"
import type { DB_FolderType, DB_FileType } from "~/server/db/schema"
import TableBodyInternal from "./table-body"
import { UploadButton } from "~/utils/uploadthing"
import { useRouter } from "next/navigation"

type Props = {
  currentFolderId: number
  folders: DB_FolderType[]
  files: DB_FileType[]
  baseHref?: string
}

export function Table({
  baseHref = "/drive/1",
  folders,
  files,
  currentFolderId,
}: Props) {
  const navigate = useRouter()

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
      <UploadButton
        input={{ folderId: currentFolderId }}
        endpoint="imageUploader"
        onClientUploadComplete={() => navigate.refresh()}
      />
    </div>
  )
}
