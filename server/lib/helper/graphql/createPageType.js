import {
  GraphQLObjectType as Output,
  GraphQLNonNull as Required,
  GraphQLInt as TInt,
  GraphQLBoolean as TBoolean,
  GraphQLList as List,
  getNamedType,
  isNonNullType,
  isListType,
} from "graphql"

const {isArray} = Array

const rowsToList = ({rows}) => rows

const getCurrent = ({page = 1}) => page

function getHasNext({limit, page, count}) {
  if (limit != null && page != null && count != null) {
    return count - limit * page > 0
  }

  return false
}

function getLastPage({limit, page, count}) {
  if (limit != null && page != null && count != null) {
    Math.ceil(count / (limit * page))
  }

  return 1
}

function getTypeInfo(t) {
  if (isArray(t)) {
    return t
  }

  return [getNamedType(t), isNonNullType(t)]
}

/**
 * @param {Object} config
 * @param {Output | [Output, boolean]} config.type
 * @param {boolean} [config.required = false]
 */
function createPageType({type: target, required = false, ...field}) {
  // eslint-disable-next-line prefer-const
  let [t, nonNullableFlag] = getTypeInfo(target)

  const typeName = t.name.endsWith("Page") ? t.name : `${t.name}Page`

  if (!isListType(t)) {
    t = new List(nonNullableFlag ? new Required(t) : t)
  }

  return new Output({
    name: typeName,
    description: "Returns a page frame and navigation information.",
    fields: {
      count: {
        type: new Required(TInt),
        description: "Returns the total number of rows",
      },
      limit: {
        type: TInt,
        description: "Returns the actual limit of per-page entities",
      },
      offset: {
        type: new Required(TInt),
        description: "Returns the zero-indexed offset from the start",
      },
      current: {
        type: new Required(TInt),
        resolve: getCurrent,
        description: "Returns the number of the current page",
      },
      hasNext: {
        type: new Required(TBoolean),
        resolve: getHasNext,
        description: "Returns \"true\" when the next page exists, "
          + "\"false\" for otherwise",
      },
      last: {
        type: new Required(TInt),
        resolve: getLastPage,
        description: "Returns the number of the last page",
      },
      list: {
        ...field,

        type: required ? new Required(t) : t,
        resolve: rowsToList,
        description: "Returns the rows for the current page",
      },
    },
  })
}

export default createPageType
