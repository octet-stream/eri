import create from "http-errors"

/**
 * @param {string} [subject]
 * @param {Object.<string, any>} [options]
 */
const notFound = (subject, options) => {
  const message = subject ? `Can't find requested ${subject}` : "Not Found"

  return create(404, message, options)
}

export default notFound
