import {createContext, useMemo} from "react"
import type {FC, ReactNode} from "react"
import {parse} from "superjson"

interface Props {
  data?: string
  children: ReactNode
}

export const PageDataContext = createContext<unknown | undefined>(undefined)

export const PageDataProvider: FC<Props> = ({data, children}) => {
  const parsedData = useMemo(() => data ? parse(data) : undefined, [data])

  return (
    <PageDataContext.Provider value={parsedData}>
      {children}
    </PageDataContext.Provider>
  )
}
