import {createConnection, getConnection, Connection} from "typeorm"

const r = require.context("../../model", false, /\.ts$/)

async function getOrCreateConnection(): Promise<Connection> {
  try {
    return getConnection()
  } catch {
    const connection = await createConnection({
      type: process.env.DB_DIALECT,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || null,
      username: process.env.DB_USER || null,
      password: process.env.DB_PASSWORD || null,
      database: process.env.DB_NAME,
      entities: r.keys().map(id => r(id).default) as Function[],
      logging: true
    })

    console.log("Connected to the database")

    return connection
  }
}

// ! Next.js calls process.exit() method in their binary, which ignores gracefull shutdown of the app
// ! On the next line I'll try to tell the ORM to close the connection anyway, now sure if this will be enough
// process.on("exit", () => getConnection().close())

export default getOrCreateConnection
