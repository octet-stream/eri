"use client"

import {useContext, createContext} from "react"
import type {FC, ReactNode, Context} from "react"

import {MaybeUndefined} from "lib/type/MaybeUndefined"

interface ProviderProps<T extends object> {
  data: T
  children: ReactNode
}

interface CreatePageDataContextResult<T extends object> {
  /**
   * Plain `StateContext` object. Typically you won't need to use it directly.
   */
  StateContext: Context<MaybeUndefined<T>>

  /**
   * Wraps its child components into the `StateContext`. Creates `valtio` state object for given `data` property.
   */
  StateContextProvider: FC<ProviderProps<T>>

  /**
   * Returns page data from context.
   * Components will not react to the changes in this object, it meant for read-only
   */
  usePageData(): T
}

/**
 * Creates `valtio` state object with `React.createContext`, and bunch of utilities to get access this state from within the context.
 */
export const createPageDataContext = <
  T extends object
>(): CreatePageDataContextResult<T> => {
  const StateContext = createContext<MaybeUndefined<T>>(undefined)

  const StateContextProvider: FC<ProviderProps<T>> = ({data, children}) => (
    <StateContext.Provider value={data}>
      {children}
    </StateContext.Provider>
  )

  function usePageData(): T {
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
