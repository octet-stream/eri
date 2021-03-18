import {isApolloError} from "@apollo/client"

import PageError from "type/PageError"

/**
 * @param error
 */
const serializeError = (error: any): PageError => {
  if (!error) {
    return null
  }

  if (process.env.NODE_ENV !== "production") {
    console.error(error)
  }

  if (isApolloError(error)) {
    error = error.networkError
      ? error.networkError
      : error.graphQLErrors[0].originalError
  }

  // TODO: Improve errors serialization
  return {
    name: error.name,
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
    status: error.status ?? 500,
    code: error.code ?? null,
    statusCode: error.status ?? 500,
    statusText: error.statusText || "Internal Server Error"
  }
}

export default serializeError
