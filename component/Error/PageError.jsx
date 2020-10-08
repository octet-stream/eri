import NextError from "next/error"
import t from "prop-types"

import NotFound from "component/Error/NotFound"

/**
 * @typedef {Object} PageErrorObject
 *
 * @prop {string} name
 * @prop {string} message
 * @prop {number} [status]
 * @prop {number} [statusCode]
 * @prop {string} [code]
 * @prop {string} [stack]
 */

/**
 * @typedef {Object} PageErrorProps
 *
 * @prop {React.ReactNode} children
 * @prop {PageErrorObject} error
 */

/**
 * @type {React.FC<PageErrorProps>}
 */
const PageError = ({error, children}) => {
  if (!error) {
    // TODO: Add error boundary here
    return children
  }

  if (error.status === 404) {
    return <NotFound />
  }

  return <NextError {...error} />
}

PageError.propTypes = {
  children: t.node.isRequired,
  error: t.shape({
    name: t.string,
    message: t.string,
    code: t.string,
    status: t.number,
    stack: t.string,
    statusCode: t.number
  })
}

PageError.defaultProps = {
  error: null
}

export default PageError
