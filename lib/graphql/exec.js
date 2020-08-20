import {graphql, print} from "graphql"

import isString from "lodash/isString"

import schema from "server/api/schema"

/**
 * Executes given GraphQL query on the schema.
 * It performs all queries on the application's schema from server/api/schema
 *
 * @param {Object} params
 * @param {string} params.query
 * @param {string} [params.operationName]
 * @param {Object.<string, any>} [params.variables]
 * @param {any} [params.root]
 * @param {any} [params.context]
 */
const exec = ({
  query,
  operationName,
  variables,
  root,
  context
}) => graphql(
  schema,
  isString(query) ? query : print(query),
  root,
  context,
  variables,
  operationName
)

export default exec
