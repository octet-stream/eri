import create from "http-errors"

/**
 * @param {Object.<string, any>} [options]
 */
const notFound = options => create(404, "Can't find requested post", options)

export default notFound
