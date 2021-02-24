import {createConnection, getConnection, Connection} from "typeorm"

import Tag from "server/model/Tag"
import File from "server/model/File"
import User from "server/model/User"
import Post from "server/model/Post"

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
      entities: [File, Tag, User, Post]
    })
  }
}

export default getOrCreateConnection
