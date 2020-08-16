import {
  GraphQLObjectType as Output,
  GraphQLNonNull as Required,
  GraphQLString as TString,
  GraphQLInt as TInt,
} from "graphql"

import TDates from "server/api/type/common/TDates"
import TUserName from "server/api/type/user/TUserName"

import dates from "server/api/resolve/query/common/dates"
import name from "server/api/resolve/query/user/name"

const TUser = new Output({
  name: "User",
  fields: {
    id: {
      type: new Required(TInt)
    },
    login: {
      type: new Required(TString)
    },
    name: {
      type: new Required(TUserName),
      resolve: name
    },
    dates: {
      type: new Required(TDates),
      resolve: dates
    }
  }
})

export default TUser
