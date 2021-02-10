import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject
} from "@apollo/client"

import fetch from "isomorphic-fetch"

let cachedClient: ApolloClient<NormalizedCacheObject>

const createApollo = () => new ApolloClient<NormalizedCacheObject>({
  ssrMode: process.browser === false,
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL,
    credentials: "same-origin",
    fetch
  }),
  cache: new InMemoryCache()
})

/**
 * Creates and returns a new ApolloClient instance
 */
function initializeApollo(initialState: NormalizedCacheObject = null) {
  const client = cachedClient ?? createApollo()

  if (initialState) {
    const oldCache = client.extract()

    client.cache.restore({...oldCache, ...initialState})
  }

  // Always return a new client for SSR
  if (process.browser === false) {
    return client
  }

  // Cache client if it wasn't cached before
  if (!cachedClient) {
    cachedClient = client
  }

  return client
}

export default initializeApollo
