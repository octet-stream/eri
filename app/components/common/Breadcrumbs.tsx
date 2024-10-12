import {Link, type UIMatch, useLocation, useMatches} from "@remix-run/react"
import {createContext, useContext} from "react"
import type {FC, ReactNode} from "react"

import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Breadcrumb as UIBreadcrumb
} from "../ui/Breadcrumb.jsx"

export interface BreadcrumbHandle {
  breadcrumb(match: UIMatch): ReactNode
}

export type BreadcrumbMatch = UIMatch<unknown, BreadcrumbHandle>

const BreadcrumbContext = createContext<BreadcrumbMatch | null>(null)

function useBreadcrumbContext(): BreadcrumbMatch {
  const context = useContext(BreadcrumbContext)

  if (!context) {
    throw new Error("Unable to find BreadcrumbContext.")
  }

  return context
}

export interface BreadcrumbProps {
  href?: string
  children: ReactNode
}

/**
 * Contextual breadcrumb item.
 *
 * This component renders its `children` node as `<BreadcrumbPage>` if current location matches breadcrumb's own pathname and `<BreadcrumbLink>` with given `href` parameter for otherwise
 */
export const Breadcrumb: FC<BreadcrumbProps> = ({href, children}) => {
  const match = useBreadcrumbContext()
  const location = useLocation()

  if (location.pathname !== match.pathname && href) {
    return (
      <BreadcrumbLink asChild>
        <Link to={href}>{children}</Link>
      </BreadcrumbLink>
    )
  }

  return <BreadcrumbPage>{children}</BreadcrumbPage>
}

/**
 * Dynamic breadcrumbs component built with remix's router in mind.
 *
 * Renders a breadcrumb from every route match with `breadbrumb` handle.
 *
 * Use it in conjunction with `Breadcrumb` component to render contexrual breadbrumb items
 */
export const Breadcrumbs: FC = () => {
  const matches = useMatches() as BreadcrumbMatch[]

  return (
    <UIBreadcrumb>
      <BreadcrumbList>
        {matches
          .filter(match => match.handle?.breadcrumb)
          .map((match, current, {length: total}) => (
            <BreadcrumbContext.Provider key={match.id} value={match}>
              <BreadcrumbItem>{match.handle.breadcrumb(match)}</BreadcrumbItem>

              {current + 1 < total && <BreadcrumbSeparator />}
            </BreadcrumbContext.Provider>
          ))}
      </BreadcrumbList>
    </UIBreadcrumb>
  )
}
