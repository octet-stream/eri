import {createConnection, Connection, useContainer} from "typeorm"
import {Container} from "typeorm-typedi-extensions"

import Tag from "entity/Tag"
import File from "entity/File"
import User from "entity/User"
import Post from "entity/Post"

let connection: Connection = null

useContainer(Container)

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
