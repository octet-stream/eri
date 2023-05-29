"use client"

import {useContext, createContext} from "react"
import type {FC, ReactNode, Context} from "react"

import {MaybeUndefined} from "lib/type/MaybeUndefined"

interface ProviderProps<TData> {
  data: TData
  children: ReactNode
}

interface CreatePageDataContextResult<TData> {
  /**
   * Plain `StateContext` object. Typically you won't need to use it directly.
   */
  StateContext: Context<MaybeUndefined<TData>>

  /**
   * Wraps its child components into the `StateContext`. Creates `valtio` state object for given `data` property.
   */
  StateContextProvider: FC<ProviderProps<TData>>

  /**
   * Returns page data from context.
   * Components will not react to the changes in this object, it meant for read-only
   */
  usePageData(): TData
}

/**
 * Creates `valtio` state object with `React.createContext`, and bunch of utilities to get access this state from within the context.
 */
export const createPageDataContext = <
  TData,
>(): CreatePageDataContextResult<TData> => {
  const StateContext = createContext<MaybeUndefined<TData>>(undefined)

  const StateContextProvider: FC<ProviderProps<TData>> = ({data, children}) => (
    <StateContext.Provider value={data}>
      {children}
    </StateContext.Provider>
  )

  function usePageData(): TData {
    const proxy = useContext(StateContext)

    if (!proxy) {
      throw new Error("Can't get access to data context.")
    }

    return proxy
  }

  return {
    StateContext,
    StateContextProvider,
    usePageData
  }
}
