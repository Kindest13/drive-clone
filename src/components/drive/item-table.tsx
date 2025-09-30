"use client"

import Link from "next/link"
import { type DriveFile, type DriveFolder, normalizeName } from "~/lib/mock-drive"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"

type Props = {
  baseHref: string
  folders: DriveFolder[]
  files: DriveFile[]
}

export function ItemTable({ baseHref, folders, files }: Props) {
  return (
    <div className="w-full overflow-x-auto rounded-md border">
      <Table aria-label="Folder contents table">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60%]">Name</TableHead>
            <TableHead className="w-[20%]">Type</TableHead>
            <TableHead className="w-[20%] text-right">Size</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Folders */}
          {folders.map((folder) => {
            const href = `${baseHref}/${normalizeName(folder.name)}`
            return (
              <TableRow key={`folder-${folder.name}`}>
                <TableCell className="py-3">
                  <Link
                    href={href}
                    aria-label={`Open folder ${folder.name}`}
                    className="text-foreground hover:underline"
                  >
                    {folder.name}
                  </Link>
                </TableCell>
                <TableCell className="text-muted-foreground">Folder</TableCell>
                <TableCell className="text-right text-muted-foreground">—</TableCell>
              </TableRow>
            )
          })}
          {/* Files */}
          {files.map((file) => (
            <TableRow key={`file-${file.name}`}>
              <TableCell className="py-3">
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open file ${file.name}`}
                  className="text-foreground hover:underline"
                >
                  {file.name}
                </a>
              </TableCell>
              <TableCell className="text-muted-foreground">File</TableCell>
              <TableCell className="text-right text-muted-foreground">{file.size ?? "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
