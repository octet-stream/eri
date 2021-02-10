import type {NormalizedCacheObject} from "@apollo/client"

import {useMemo} from "react"

import initializeApollo from "./initializeApollo"

const useApollo = (initialState: NormalizedCacheObject = null) => useMemo(
  () => initializeApollo(initialState),

  [initialState]
)

export default useApollo
