import {createContext, useMemo} from "react"
import {parse} from "superjson"
import type {FC, ReactNode} from "react"

interface Props {
  data?: string
  children: ReactNode
}

export const PageDataContext = createContext<unknown>(undefined)

export const PageDataProvider: FC<Props> = ({data, children}) => {
  const parsedData = useMemo(() => data ? parse(data) : undefined, [data])

  return (
    <PageDataContext.Provider value={parsedData}>
      {children}
    </PageDataContext.Provider>
  )
}
