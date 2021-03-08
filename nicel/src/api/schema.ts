import {buildSchemaSync, NonEmptyArray} from "type-graphql"
import {Container} from "typeorm-typedi-extensions"

import authChecker from "lib/auth/authChecker"

import Auth from "api/resolve/Auth"
import Post from "api/resolve/Post"
import User from "api/resolve/User"

const resolvers = [Auth, Post, User] as NonEmptyArray<Function>

const schema = buildSchemaSync({authChecker, resolvers, container: Container})

export default schema
