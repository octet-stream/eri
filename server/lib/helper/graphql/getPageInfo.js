/**
  * @typedef {Object} PageInfo
  *
  * @prop {number} limit
  * @prop {number} offset
  * @prop {number} page
  */

/**
 * Gets the page information from given parameters
 *
 * @param {Object} [params = {}]
 * @param {number} params.page
 * @param {number} params.limit
 * @param {{maxLimit: number}} [options = {}]
 *
 * @return {PageInfo}
 */
const getPageInfo = ({page = 1, limit = 10} = {}, {maxLimit = 50} = {}) => {
  page < 1 && (page = 1)
  limit < 1 && (limit = 10)

  if (limit > maxLimit) {
    limit = maxLimit
  }

  const offset = limit * (page - 1)

  return {limit, offset, page}
}

export default getPageInfo
