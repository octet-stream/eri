import {buildSchemaSync, NonEmptyArray} from "type-graphql"

import authChecker from "server/lib/auth/authChecker"

import Auth from "server/api/resolve/Auth"
import Post from "server/api/resolve/Post"
import User from "server/api/resolve/User"

const resolvers = [Auth, Post, User] as NonEmptyArray<Function>

const schema = buildSchemaSync({authChecker, resolvers})

export default schema
