import { Folder, File } from "lucide-react"
import {
  normalizeName,
  type DriveFile,
  type DriveFolder,
} from "~/lib/mock-drive"
import { TableRow, TableCell } from "../ui/table"
import Link from "next/link"

type Props = {
  folders: DriveFolder[]
  files: DriveFile[]
  baseHref: string
}
export default function TableBody({ baseHref, folders, files }: Props) {
  return (
    <>
      {folders.map((folder) => {
        const href = `${baseHref}/${normalizeName(folder.name)}`
        return (
          <TableRow key={`folder-${folder.name}`}>
            <TableCell className="py-3">
              <Link
                href={href}
                aria-label={`Open folder ${folder.name}`}
                className="text-foreground flex items-center hover:underline"
              >
                <Folder className="mr-3" size={20} />
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
              <File className="mr-3" size={20} />
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
