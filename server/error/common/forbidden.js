import create from "http-errors"

/**
 * @param {Object} params
 * @param {string} [params.subject]
 * @param {string} [params.operation]
 * @param {Object.<string, any>} options
 */
const forbidden = ({subject, operation}, options) => create(
  403, `You can't perform "${operation}" operation on "${subject}"`, options
)

export default forbidden
