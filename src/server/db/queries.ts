import "server-only"

import { db } from "~/server/db"
import { files_table, folders_table } from "~/server/db/schema"
import { eq } from "drizzle-orm"

export const QUERIES = {
  getFolders: (folderID: number) => {
    return db
      .select()
      .from(folders_table)
      .where(eq(folders_table.parent, BigInt(folderID)))
  },
  getFiles: (folderID: number) => {
    return db
      .select()
      .from(files_table)
      .where(eq(files_table.parent, BigInt(folderID)))
  },
  getAllParentsForFolder: async function (folderId: number) {
    const parents = []
    let currentId: bigint | null = BigInt(folderId)
    while (currentId !== null) {
      const folder = await db
        .selectDistinct()
        .from(folders_table)
        .where(eq(folders_table.id, BigInt(currentId)))

      if (!folder[0]) {
        throw new Error("Parent folder not found")
      }
      parents.unshift(folder[0])
      currentId = folder[0]?.parent
    }
    return parents
  },
}

export const MUTATIONS = {
  createFile: async function (input: {
    file: {
      name: string | null
      ownerId: string
      url: string
      size: number | null
      parent: bigint
    }
    userId: string
  }) {
    return await db
      .insert(files_table)
      .values({ ...input.file, parent: input.file.parent })
  },
}
