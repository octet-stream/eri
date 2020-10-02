import {useMemo} from "react"

import initializeApollo from "./initializeApollo"

/**
 * @typedef {import("@apollo/client").ApolloClient} ApolloClient
 * @typedef {import("@apollo/client").NormalizedCacheObject} NormalizedCacheObject
 */

/**
 * @param {NormalizedCacheObject} [initialState]
 *
 * @return {ApolloClient<NormalizedCacheObject>}
 */
const useApollo = (initialState = null) => useMemo(
  () => initializeApollo(initialState),

  [initialState]
)

export default useApollo
