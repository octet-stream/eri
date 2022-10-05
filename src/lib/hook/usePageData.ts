import {useContext} from "react"

import {PageDataContext} from "lib/context/PageDataContext"

/**
 * Returns parsed page data from context
 */
export const usePageData = <T>() => {
  const data = useContext(PageDataContext) as T

  if (!data) {
    // TODO: Improve error message
    throw new Error(
      "Can't find page data. Did you forgot to return it to client?"
    )
  }

  return data
}
