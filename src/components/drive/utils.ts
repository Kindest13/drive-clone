import type { DB_FolderType } from "~/server/db/schema"

const ROOT_PATH = "/drive/1"
const ROOT_LABEL = "My Drive"

export function buildCrumbs(parents: DB_FolderType[]) {
  let path = "/drive"

  return parents.length > 0
    ? parents.map((folder) => {
        path += `/${folder.id}`
        return { label: folder.name, href: path }
      })
    : [
        {
          label: ROOT_LABEL,
          href: ROOT_PATH,
        },
      ]
}
