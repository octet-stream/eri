import {isApolloError} from "@apollo/client"

/**
 * @param {Object} props
 * @param {import("@apollo/client").ApolloError | Error} [error]
 */
const serializeError = error => {
  if (!error) {
    return null
  }

  if (isApolloError(error)) {
    error = error.graphQLErrors[0].originalError
  }

  return {
    name: error.name,
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
    status: error.status ?? 500,
    code: error.code ?? null,
    statusCode: error.status ?? 500
  }
}

export default serializeError
