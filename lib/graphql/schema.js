import {resolve as resolvePath} from "path"

import {GraphQLObjectType as Output, GraphQLSchema as Schema} from "graphql"

import isFunction from "lodash/isFunction"
import isEmpty from "lodash/isEmpty"
import cap from "lodash/capitalize"
import rd from "require-dir"

function normalizeField(name, config) {
  const {resolve, handler, deprecationReason, deprecate, args} = config

  if (!isFunction(resolve || handler)) {
    throw new TypeError(`Resolver "${name}" must be a function`)
  }

  return {
    type: config.type,
    description: config.description,
    deprecationReason: deprecate || deprecationReason,
    resolve: resolve || handler,
    subscription: config.subscription,
    args,
  }
}

function getSchemaPart(name) {
  let files = []

  try {
    files = rd(resolvePath("server", "api", name))
  } catch (error) {
    if (name === "query" && error.code === "ENOENT") {
      throw new Error("GraphQL schema require a Query field to be presented.")
    } else if (error.name !== "ENOENT") {
      throw error
    }
  }

  const fields = {}
  for (const [key, config] of Object.entries(files)) {
    if (!isEmpty(config.default || config)) {
      fields[key] = normalizeField(name, config.default || config)
    }
  }

  if (isEmpty(fields)) {
    return undefined
  }

  return new Output({name: cap(name), fields})
}

const schema = new Schema({
  query: getSchemaPart("query"),
  mutation: getSchemaPart("mutation"),
  subscription: getSchemaPart("subscription"),
})

export default schema
