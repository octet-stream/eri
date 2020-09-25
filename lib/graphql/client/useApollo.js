import {useMemo} from "react"

import initializeApollo from "./initializeApollo"

/**
 * @param {Object.<string, any>} [initialState]
 */
const useApollo = (initialState = null) => useMemo(
  () => initializeApollo(initialState),

  [initialState]
)

export default useApollo
