import {buildSchemaSync} from "type-graphql"

import Post from "server/api/resolve/Post"
import User from "server/api/resolve/User"

const schema = buildSchemaSync({
  resolvers: [User, Post] as const
})

export default schema
