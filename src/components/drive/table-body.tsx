import { Folder as FolderIcon, File as FileIcon } from "lucide-react"
import { normalizeFolderID } from "~/lib/mock-data"
import { TableRow, TableCell } from "../ui/table"
import Link from "next/link"
import type { DB_FileType, DB_FolderType } from "~/server/db/schema"

type Props = {
  folders: DB_FolderType[]
  files: DB_FileType[]
  baseHref: string
}

export default function TableBody({ baseHref, folders, files }: Props) {
  return (
    <>
      {folders.map((folder) => {
        const href = `${baseHref}/${normalizeFolderID(folder.id)}`
        return (
          <TableRow key={`folder-${folder.name}`}>
            <TableCell className="py-3">
              <Link
                href={href}
                aria-label={`Open folder ${folder.name}`}
                className="text-foreground flex items-center hover:underline"
              >
                <FolderIcon className="mr-3" size={20} />
                {folder.name}
              </Link>
            </TableCell>
            <TableCell className="text-muted-foreground">Folder</TableCell>
            <TableCell className="text-muted-foreground text-right">
              —
            </TableCell>
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
              aria-label={`Open file ${file.name}`}
              className="text-foreground flex items-center hover:underline"
            >
              <FileIcon className="mr-3" size={20} />
              {file.name}
            </a>
          </TableCell>
          <TableCell className="text-muted-foreground">File</TableCell>
          <TableCell className="text-muted-foreground text-right">
            {file.size ?? "—"}
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}
