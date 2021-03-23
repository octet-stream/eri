import {IncomingMessage} from "http"
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject
} from "@apollo/client"

import fetch from "lib/helper/util/createFetch"

let cachedClient: ApolloClient<NormalizedCacheObject>

const createApollo = (
  req?: IncomingMessage
) => new ApolloClient<NormalizedCacheObject>({
  ssrMode: process.browser === false,
  link: new HttpLink({
    fetch: fetch(req),
    uri: process.env.NEXT_PUBLIC_GRAPHQL,
    credentials: "include"
  }),
  cache: new InMemoryCache()
})

/**
 * Creates and returns a new ApolloClient instance
 */
function getApollo(
  initialState?: NormalizedCacheObject,
  req?: IncomingMessage
) {
  const client = cachedClient ?? createApollo(req)

  if (initialState) {
    const oldCache = client.extract()

    client.cache.restore({...oldCache, ...initialState})
  }

  // Always return a new client for SSR
  if (!process.browser) {
    return client
  }

  // Cache client if it wasn't cached before
  if (!cachedClient) {
    cachedClient = client
  }

  return client
}

export default getApollo
