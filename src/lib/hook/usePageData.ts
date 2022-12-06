import {useContext} from "react"

import {PageDataContext} from "lib/context/PageDataContext"

/**
 * Returns parsed page data from context, and a function to apply patch for this data, after it was updated on the server.
 */
export const usePageData = <T>() => {
  const data = useContext(PageDataContext)

  if (!data) {
    // TODO: Improve error message
    throw new Error(
      "Can't find page data. Did you forgot to return it to client?"
    )
  }

  return data as T
}
