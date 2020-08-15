import {
  GraphQLObjectType as Output,
  GraphQLString as TString
} from "graphql"

const TUserName = new Output({
  name: "UserName",
  fields: {
    first: {
      type: TString
    },
    last: {
      type: TString
    }
  }
})

export default TUserName
