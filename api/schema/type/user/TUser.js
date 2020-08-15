import {
  GraphQLObjectType as Output,
  GraphQLNonNull as Required,
  GraphQLString as TString,
  GraphQLInt as TInt,
} from "graphql"

import TDates from "api/schema/type/common/TDates"
import TUserName from "api/schema/type/user/TUserName"

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
      type: new Required(TUserName)
    },
    dates: {
      type: new Required(TDates)
    }
  }
})

export default TUser
