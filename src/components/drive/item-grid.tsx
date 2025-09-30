"use client"

import Link from "next/link"
import { type DriveFile, type DriveFolder, normalizeName } from "~/lib/mock-drive"
import { cn } from "~/lib/utils"

type Props = {
  baseHref: string // "/drive" or "/drive/a/b"
  folders: DriveFolder[]
  files: DriveFile[]
}

export function ItemGrid({ baseHref, folders, files }: Props) {
  return (
    <section aria-label="Folder contents" className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {folders.map((f) => (
        <FolderCard
          key={f.name}
          href={`${baseHref}/${normalizeName(f.name)}`}
          name={f.name}
          count={f.children.length}
        />
      ))}
      {files.map((file) => (
        <FileCard key={file.name} file={file} />
      ))}
    </section>
  )
}

function FolderCard({
  name,
  href,
  count,
}: {
  name: string
  href: string
  count: number
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group rounded-md border bg-card p-4 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
      aria-label={`Open folder ${name}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <FolderIcon className="h-6 w-6 text-primary" />
        <span className="text-xs text-muted-foreground">{count} items</span>
      </div>
      <div className="line-clamp-2 text-sm text-foreground">{name}</div>
    </Link>
  )
}

function FileCard({ file }: { file: DriveFile }) {
  return (
    <a
      href={file.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group rounded-md border bg-card p-4 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
      aria-label={`Open file ${file.name}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <FileIcon className="h-6 w-6 text-muted-foreground" />
        {file.size ? <span className="text-xs text-muted-foreground">{file.size}</span> : null}
      </div>
      <div className="line-clamp-2 text-sm text-foreground">{file.name}</div>
    </a>
  )
}

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M10.59 4.59c-.37-.37-.88-.59-1.41-.59H5C3.9 4 3 4.9 3 6v2h18V7c0-1.1-.9-2-2-2h-7l-1.41-.41zM21 9H3v9c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9z" />
    </svg>
  )
}

function FileIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.11 0 2-.9 2-2V8l-6-6zm1 7V3.5L19.5 9H15z" />
    </svg>
  )
}
