import {FC} from "react"

import NextError from "next/error"

import PageErrorObject from "type/PageError"
import NotFound from "component/Error/NotFound"

interface PageErrorProps {
  error?: PageErrorObject
}

/**
 * Will render next/error component if an error prop is taken. Otherwise its own child component will be rendered.
 */
const PageError: FC<PageErrorProps> = ({error, children}) => {
  if (!error) {
    // TODO: Add error boundary here
    return <>{children}</>
  }

  if (error.status === 404) {
    return <NotFound />
  }

  return <NextError statusCode={error.status} error={error} />
}

export default PageError
