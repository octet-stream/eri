import {createConnection, getConnection, Connection} from "typeorm"

const r = require.context("../../model", false, /\.ts$/)

async function getOrCreateConnection(): Promise<Connection> {
  try {
    return getConnection()
  } catch {
    return createConnection({
      type: process.env.DB_DIALECT,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || null,
      username: process.env.DB_USER || null,
      password: process.env.DB_PASSWORD || null,
      database: process.env.DB_NAME,
      entities: r.keys().map(id => r(id).default)
    })
  }
}

export default getOrCreateConnection
