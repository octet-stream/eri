import "reflect-metadata"

import {buildSchemaSync, NonEmptyArray} from "type-graphql"

import authChecker from "server/lib/auth/authChecker"

const r = require.context("./resolve", false, /\.ts$/)

const schema = buildSchemaSync({
  authChecker,
  resolvers: r.keys().map(id => r(id).default) as NonEmptyArray<Function>
})

export default schema
