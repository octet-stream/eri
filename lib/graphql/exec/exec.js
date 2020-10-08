import {graphql, print} from "graphql"
import {ApolloError} from "@apollo/client"

import isString from "lodash/isString"

import schema from "server/api/schema"

/**
 * @typedef {import("graphql").ExecutionResult} ExecutionResult
 */

/**
 * Executes given GraphQL query on the schema.
 * It performs all queries on the application's schema from server/api/schema
 *
 * Use this only inslide of getServerSideProps
 *
 * @param {Object} params
 * @param {string} params.query
 * @param {string} [params.operationName]
 * @param {Object.<string, any>} [params.variables]
 * @param {any} [params.root]
 * @param {any} [params.context]
 *
 * @return {{data: ExecutionResult, error: ApolloError}}
 */
const exec = async ({query, operationName, variables, root, context}) => {
  if (!isString(query)) {
    query = print(query)
  }

  const {data, errors} = await graphql(
    schema, query, root, context, variables, operationName
  )

  /** @type {ApolloError | null} */
  let error = null
  if (errors && errors.length > 0) {
    error = new ApolloError({graphQLErrors: errors})
  }

  return {data, error}
}

export default exec
