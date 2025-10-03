import "server-only"

import {
  int,
  bigint,
  text,
  index,
  singlestoreTableCreator,
} from "drizzle-orm/singlestore-core"

const createTable = singlestoreTableCreator((name) => `drive-clone_${name}`)

export const files_table = createTable(
  "files_table",
  {
    id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
    name: text("name"),
    url: text("url").notNull(),
    size: int("size"),
    parent: bigint("parent", { mode: "bigint", unsigned: true }).notNull(),
  },
  (t) => [index("parent_index").on(t.parent)],
)

export const folders_table = createTable(
  "folders_table",
  {
    id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
    name: text("name").notNull(),
    parent: bigint("parent", { mode: "bigint", unsigned: true }),
  },
  (t) => [index("parent_index").on(t.parent)],
)

export type DB_FileType = typeof files_table.$inferSelect
export type DB_FolderType = typeof folders_table.$inferSelect
