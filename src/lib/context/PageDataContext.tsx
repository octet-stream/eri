import {createContext, useMemo, useState, useEffect} from "react"
import {useEvent} from "react-use-event-hook"
import type {FC, ReactNode} from "react"
import {useRouter} from "next/router"
import {noop, omitBy} from "lodash"
import {parse} from "superjson"

interface Props {
  data?: string
  children: ReactNode
}

interface PageDataUpdate {
  (id: string, data: object): void
}

interface PageContext {
  data: unknown
  update: PageDataUpdate
}

export const PageDataContext = createContext<PageContext>({
  data: {},
  update: noop
})

export const PageDataProvider: FC<Props> = ({data, children}) => {
  const parsedData = useMemo(() => data ? parse(data) : undefined, [data])
  const router = useRouter()

  const [state, setState] = useState<Record<string, unknown>>({})

  useEffect(() => {
    setState(prev => ({
      ...omitBy(prev, (_, page) => page !== router.asPath),

      [router.asPath]: prev[router.asPath] || parsedData
    }))
  }, [router.asPath])

  // Updates data on the page
  const update = useEvent<PageDataUpdate>((id, data) => setState(
    prev => ({...prev, [id]: data})
  ))

  const context = useMemo<PageContext>(() => ({
    data: state[router.asPath] || parsedData, update
  }), [state, parsedData, update])

  return (
    <PageDataContext.Provider value={context}>
      {children}
    </PageDataContext.Provider>
  )
}
