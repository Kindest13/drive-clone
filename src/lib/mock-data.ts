export type File = {
  id: string
  type: "file"
  parent: string
  name: string
  url: string
  size: string
}

export type Folder = {
  id: string
  type: "folder"
  parent: string | null
  name: string
}

export type DriveNode = Folder | File

export const mockDriveNodes: DriveNode[] = [
  { type: "folder", id: "drive", parent: null, name: "My Drive" },
  { type: "folder", id: "projects", parent: "drive", name: "Projects" },
  { type: "folder", id: "empty", parent: "projects", name: "empty" },
  {
    type: "file",
    id: "project-brief",
    parent: "projects",
    name: "Project-Brief.pdf",
    url: "https://example.com/files/project-brief.pdf",
    size: "1.2 MB",
  },
  {
    type: "file",
    id: "roadmap",
    parent: "projects",
    name: "Roadmap.xlsx",
    url: "https://example.com/files/roadmap.xlsx",
    size: "420 KB",
  },
  { type: "folder", id: "design", parent: "projects", name: "Design" },
  {
    type: "file",
    id: "logo",
    parent: "design",
    name: "logo.svg",
    url: "https://example.com/files/logo.svg",
    size: "8 KB",
  },
  {
    type: "file",
    id: "hero",
    parent: "design",
    name: "hero.png",
    url: "https://example.com/files/hero.png",
    size: "640 KB",
  },
  { type: "folder", id: "personal", parent: "drive", name: "Personal" },
  {
    type: "file",
    id: "resume",
    parent: "personal",
    name: "Resume.pdf",
    url: "https://example.com/files/resume.pdf",
    size: "256 KB",
  },
  {
    type: "file",
    id: "taxes",
    parent: "personal",
    name: "Taxes-2024.zip",
    url: "https://example.com/files/taxes-2024.zip",
    size: "4.8 MB",
  },
  {
    type: "file",
    id: "notes",
    parent: "drive",
    name: "Meeting-Notes.txt",
    url: "https://example.com/files/meeting-notes.txt",
    size: "3 KB",
  },
  {
    type: "file",
    id: "deck",
    parent: "drive",
    name: "Pitch-Deck.pptx",
    url: "https://example.com/files/pitch-deck.pptx",
    size: "3.4 MB",
  },
]

// Find folder by path
export function getFolderIDByPath(
  pathSegments: string[] | undefined,
  nodes: DriveNode[] = mockDriveNodes,
  rootId = "drive",
): string | null {
  let currentFolderId: string | null = rootId

  if (!pathSegments || pathSegments.length === 0) {
    return currentFolderId
  }

  for (const seg of pathSegments) {
    const folder = nodes.find(
      (node) =>
        node.type === "folder" &&
        node.parent === currentFolderId &&
        normalizeFolderID(node.id) === seg,
    )
    if (!folder) return null
    currentFolderId = folder.id
  }

  return currentFolderId
}

// Normalize folder id for URL segments
export function normalizeFolderID(name: bigint | string) {
  return name.toString()
  // return encodeURIComponent(name.toLowerCase().replace(/\s+/g, "-"))
}

// Get folder contents (files + folders)
export function getChildren(parentId: string | null, nodes: DriveNode[]) {
  return nodes.filter((n) => n.parent === parentId)
}

// Split into separate arrays
export function getFolderContent(folderID: string, content: DriveNode[]) {
  const folders: Folder[] = []
  const files: File[] = []
  const nodes = getChildren(folderID, content)

  for (const node of nodes) {
    if (node.type === "folder") folders.push(node)
    else files.push(node)
  }

  return { folders, files }
}
