import isEmpty from "lodash/isEmpty"

import serialize from "./serializeError"

// TODO: Figure out proper type declaration for this
const withError = (fn: Function) => async (ctx: unknown): Promise<unknown> => {
  let error = null
  let result = null
  try {
    result = await fn(ctx)

    error = result.props.error
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

export default withError
