import {useMatches, type UIMatch} from "@remix-run/react"
import type {FC, ReactNode} from "react"
import {Fragment} from "react"

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbItem
} from "./ui/Breadcrumb.jsx"

export interface BreadcrumbHandle {
  breadcrumb(match: UIMatch): ReactNode
}

export const Breadcrumbs: FC = () => {
  const matches = useMatches() as UIMatch<never, BreadcrumbHandle>[]

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {
          matches
            .filter(match => match.handle && match.handle.breadcrumb)
            .map((match, i, {length}) => (
              <Fragment key={match.id}>
                <BreadcrumbItem>
                  {match.handle.breadcrumb(match)}
                </BreadcrumbItem>

                {i < length - 1 && <BreadcrumbSeparator />}
              </Fragment>
            ))
        }
      </BreadcrumbList>
    </Breadcrumb>
  )
}
