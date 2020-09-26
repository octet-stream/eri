import create from "server/error/common/notFound"

/**
 * @param {Object.<string, any>} [options]
 */
const notFound = options => create("post", options)

export default notFound
