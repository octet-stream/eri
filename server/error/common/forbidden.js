import create from "http-errors"

/**
 * @param {Object} params
 * @param {string} [params.subject]
 * @param {string} [params.operation]
 * @param {Object.<string, any>} options
 */
const forbidden = ({subject, operation}, options) => {
  const message = subject && operation
    ? `You can't perform "${operation}" operation on "${subject}"`
    : "Access denied."

  return create(403, message, options)
}

export default forbidden
