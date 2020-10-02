import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client"

import fetch from "isomorphic-fetch"

/**
 * @typedef {import("@apollo/client").NormalizedCacheObject} NormalizedCacheObject
 */

/**
 * @type {ApolloClient<NormalizedCacheObject>}
 */
let cachedClient = null

const createApollo = () => new ApolloClient({
  ssrMode: process.browser === false,
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL,
    credentials: "same-origin",
    fetch
  }),
  cache: new InMemoryCache()
})

/**
 * @param {NormalizedCacheObject} initialState
 *
 * @return {ApolloClient<NormalizedCacheObject>}
 */
function initializeApollo(initialState = null) {
  /**
   * @type {ApolloClient<NormalizedCacheObject>}
   */
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
