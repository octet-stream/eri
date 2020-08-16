import {graphql} from "graphql"

import schema from "server/api/schema"

/**
 * Executes given GraphQL query on.
 * It performs all queries on the application's schema from lib/graphql/schema.js
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
}) => graphql(schema, query, root, context, variables, operationName)

export default exec
