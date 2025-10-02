import {
  int,
  bigint,
  text,
  
  singlestoreTable,
} from "drizzle-orm/singlestore-core"

export const users = singlestoreTable("users_table", {
  id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
  name: text("name"),
  age: int("age"),
})

export const files = singlestoreTable("files_table", {
  id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
  name: text("name"),
  url: text("url"),
  size: int("size"),
})

export const folders = singlestoreTable("folders_table", {
  id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
  name: text("name"),
  children: text("ids").array(),
})
