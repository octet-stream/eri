import type {NormalizedCacheObject} from "@apollo/client"

import {useMemo} from "react"

import getApollo from "./getApollo"

const useApollo = (initialState?: NormalizedCacheObject) => useMemo(
  () => getApollo(initialState),

  [initialState]
)

export default useApollo
