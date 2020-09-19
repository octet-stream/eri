import create from "http-errors"

/**
 * @param {Object.<string, any>} [options]
 */
const forbidden = options => create(403, "Can't find requested post", options)

export default forbidden
