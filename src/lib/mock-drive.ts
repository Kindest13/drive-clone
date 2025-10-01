export type DriveFile = {
  kind: "file"
  name: string
  url: string
  size: string
}

export type DriveFolder = {
  kind: "folder"
  name: string
  children: Array<DriveFolder | DriveFile>
}

export type DriveNode = DriveFolder | DriveFile

// Mocked Google Drive-like structure
export const mockDriveRoot: DriveFolder = {
  kind: "folder",
  name: "My Drive",
  children: [
    {
      kind: "folder",
      name: "Projects",
      children: [
        {
          kind: "file",
          name: "Project-Brief.pdf",
          url: "https://example.com/files/project-brief.pdf",
          size: "1.2 MB",
        },
        {
          kind: "file",
          name: "Roadmap.xlsx",
          url: "https://example.com/files/roadmap.xlsx",
          size: "420 KB",
        },
        {
          kind: "folder",
          name: "Design",
          children: [
            {
              kind: "file",
              name: "logo.svg",
              url: "https://example.com/files/logo.svg",
              size: "8 KB",
            },
            {
              kind: "file",
              name: "hero.png",
              url: "https://example.com/files/hero.png",
              size: "640 KB",
            },
          ],
        },
      ],
    },
    {
      kind: "folder",
      name: "Personal",
      children: [
        {
          kind: "file",
          name: "Resume.pdf",
          url: "https://example.com/files/resume.pdf",
          size: "256 KB",
        },
        {
          kind: "file",
          name: "Taxes-2024.zip",
          url: "https://example.com/files/taxes-2024.zip",
          size: "4.8 MB",
        },
      ],
    },
    {
      kind: "file",
      name: "Meeting-Notes.txt",
      url: "https://example.com/files/meeting-notes.txt",
      size: "3 KB",
    },
    {
      kind: "file",
      name: "Pitch-Deck.pptx",
      url: "https://example.com/files/pitch-deck.pptx",
      size: "3.4 MB",
    },
  ],
}

// Safely find a folder by path segments; returns null on invalid path
export function getFolderByPath(
  pathSegments: string[] | undefined,
  root: DriveFolder = mockDriveRoot,
): DriveFolder | null {
  if (!pathSegments || pathSegments.length === 0) return root
  let current: DriveFolder = root
  for (const seg of pathSegments) {
    const next = current.children.find(
      (c) => c.kind === "folder" && normalizeName(c.name) === seg,
    ) as DriveFolder | undefined
    if (!next) return null
    current = next
  }
  return current
}

// Normalizes folder name for URL segment usage
export function normalizeName(name: string) {
  return encodeURIComponent(name.toLowerCase().replace(/\s+/g, "-"))
}

// Utility to split contents of a folder into folders/files arrays
export function splitChildren(folder: DriveFolder) {
  const folders: DriveFolder[] = []
  const files: DriveFile[] = []
  for (const child of folder.children) {
    if (child.kind === "folder") folders.push(child)
    else files.push(child)
  }
  return { folders, files }
}
