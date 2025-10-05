import {
  int,
  bigint,
  text,
  index,
  singlestoreTableCreator,
  timestamp,
} from "drizzle-orm/singlestore-core"

const createTable = singlestoreTableCreator((name) => `drive-clone_${name}`)

export const files_table = createTable(
  "files_table",
  {
    id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
    name: text("name"),
    ownerId: text("ownerId").notNull(),
    url: text("url").notNull(),
    size: int("size"),
    parent: bigint("parent", { mode: "bigint", unsigned: true }).notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [
    index("parent_index").on(t.parent),
    index("owner_id_index").on(t.ownerId),
  ],
)

export const folders_table = createTable(
  "folders_table",
  {
    id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
    ownerId: text("ownerId").notNull(),
    name: text("name").notNull(),
    parent: bigint("parent", { mode: "bigint", unsigned: true }),
    created_at: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [
    index("parent_index").on(t.parent),
    index("owner_id_index").on(t.ownerId),
  ],
)

export type DB_FileType = typeof files_table.$inferSelect
export type DB_FolderType = typeof folders_table.$inferSelect
