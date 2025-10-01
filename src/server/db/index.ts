import { drizzle } from "drizzle-orm/singlestore"

import { env } from "~/env"
import * as schema from "./schema"
import { createConnection, type Connection } from "mysql2/promise"

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  client: Connection | undefined
}

export const client =
  globalForDb.client ??
  (await createConnection({
    host: env.SINGLESTORE_HOST,
    port: parseInt(env.SINGLESTORE_PORT),
    database: env.SINGLESTORE_DB_NAME,
    user: env.SINGLESTORE_USER,
    password: env.SINGLESTORE_PASS,
    ssl: {},
    maxIdle: 0,
  }))

if (env.NODE_ENV !== "production") globalForDb.client = client

client.addListener("error", (err) => {
  console.error("Database connection error: ", err)
})

export const db = drizzle(client, { schema })
