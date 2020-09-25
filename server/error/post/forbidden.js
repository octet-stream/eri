import create from "http-errors"

/**
 * @param {Object.<string, any>} [options]
 */
const forbidden = options => create(
  403, "You can't perform this operation", options
)

export default forbidden
