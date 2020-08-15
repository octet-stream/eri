import {
  GraphQLObjectType as Output,
  GraphQLNonNull as Required,
  GraphQLString as TString,
  GraphQLInt as TInt,
} from "graphql"

import TDates from "api/schema/type/common/TDates"
import TUserName from "api/schema/type/user/TUserName"

import dates from "api/schema/resolve/query/common/dates"
import name from "api/schema/resolve/query/user/name"

const TViewer = new Output({
  name: "Viewer",
  fields: {
    id: {
      type: new Required(TInt)
    },
    email: {
      type: new Required(TString)
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

export default TViewer
