import parseISO from "date-fns/parseISO"
import isString from "lodash/isString"
import toDate from "date-fns/toDate"

/**
 * @param {string} name a GraphQLObject's field name
 *
 * @return {(parent: Object<string, any>) => Date}
 */
const serializeDate = name => parent => {
  const field = parent[name]

  if (field == null) {
    return field
  }

  return toDate(isString(field) ? parseISO(field) : field)
}

export default serializeDate
