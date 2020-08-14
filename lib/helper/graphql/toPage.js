import isNumber from "lodash/isNumber"

const {isArray} = Array

/**
 * Transforms an instance's data to a pagination format
 *
 * @param {Function} fn
 */
const normalize = fn => (data = []) => {
  if (!isArray(data)) {
    return fn(data)
  }

  let [rows = [], count = 0] = data

  if (isNumber(rows)) {
    [count, rows] = [rows, count]
  }

  return fn({rows, count})
}

const toPage = ({limit, offset, page}) => normalize(({rows, count}) => ({
  limit, offset, rows, count, page
}))

export default toPage
