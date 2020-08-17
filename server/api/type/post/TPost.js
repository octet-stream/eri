import {
  GraphQLObjectType as Output,
  GraphQLNonNull as Required,
  GraphQLBoolean as TBoolean,
  GraphQLString as TString,
  GraphQLInt as TInt,
} from "graphql"

import TDates from "server/api/type/common/TDates"
import TUser from "server/api/type/user/TUser"

import dates from "server/api/resolve/query/common/dates"

const TPost = new Output({
  name: "Post",
  fields: {
    id: {
      type: new Required(TInt)
    },
    creator: {
      type: new Required(TUser)
    },
    slug: {
      type: new Required(TString)
    },
    title: {
      type: new Required(TString)
    },
    text: {
      type: new Required(TString)
    },
    isDraft: {
      type: new Required(TBoolean)
    },
    dates: {
      type: new Required(TDates),
      resolve: dates
    }
  }
})

export default TPost