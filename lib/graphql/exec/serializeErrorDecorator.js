import isEmpty from "lodash/isEmpty"

import serialize from "./serializeError"

/**
 * @template T
 *
 * @param {T} fn
 *
 * @return {T}
 */
const serializeErrorDecorator = fn => async props => {
  let error = null
  let result = null
  try {
    result = await fn(props)

    error = result?.props?.error
  } catch (e) {
    error = e
  }

  error = serialize(error)

  if (isEmpty(result?.props)) {
    return {...result, props: {error}}
  }

  result.props.error = error

  return result
}

export default serializeErrorDecorator
