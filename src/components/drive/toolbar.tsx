"use client"

import type React from "react"

import { useRef } from "react"
import { Button } from "~/components/ui/button"

export function Toolbar() {
  const inputRef = useRef<HTMLInputElement | null>(null)

  function onUploadClick() {
    inputRef.current?.click()
  }

  function onFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return
    // This is a mock only: in a real app we would upload to storage
    // For now, we just log the files to demonstrate interaction.
    console.log(
      "[v0] Selected files for upload:",
      Array.from(files).map((f) => f.name),
    )
    // Reset input so the same file can be selected again later
    e.currentTarget.value = ""
  }

  return (
    <div className="flex w-full items-center gap-3">
      <div className="flex-1">
        <input
          type="search"
          placeholder="Search in Drive"
          className="w-full rounded-md bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Search files and folders"
        />
      </div>
      <input
        ref={inputRef}
        type="file"
        multiple
        className="sr-only"
        onChange={onFilesSelected}
        aria-hidden="true"
        tabIndex={-1}
      />
      <Button
        variant="default"
        onClick={onUploadClick}
        aria-label="Upload files"
        className="bg-primary text-primary-foreground hover:opacity-90"
      >
        Upload
      </Button>
    </div>
  )
}
