import {createConnection, Connection} from "typeorm"

import Tag from "server/model/Tag"
import File from "server/model/File"
import User from "server/model/User"
import Post from "server/model/Post"

let connection: Connection = null

export async function connect(): Promise<Connection> {
  if (connection) {
    return connection
  } else {
    // ! Ignore TS checks here because it fails for some reason
    // @ts-ignore
    connection = await createConnection({
      name: "default",
      type: process.env.DB_DIALECT,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || null,
      username: process.env.DB_USER || null,
      password: process.env.DB_PASSWORD || null,
      database: process.env.DB_NAME,
      entities: [Tag, File, User, Post],
      synchronize: process.env.NODE_ENV !== "production",
      logging: true
    })

    console.log("Connected to the database")

    return connection
  }
}

export function disconnect(): Promise<void> {
  if (connection && connection.isConnected) {
    return connection.close()
  }
}

export default connect
