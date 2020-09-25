import {
  GraphQLObjectType as Output,
  GraphQLNonNull as Required,
  GraphQLBoolean as TBoolean,
  GraphQLString as TString,
  GraphQLInt as TInt,
} from "graphql"

import TPostTextEnumInput from "server/api/input/post/TPostTextEnumInput"

import TDates from "server/api/type/common/TDates"
import TUser from "server/api/type/user/TUser"

import text from "server/api/resolve/query/post/text"
import dates from "server/api/resolve/query/common/dates"
import creator from "server/api/resolve/query/post/creator"

const TPost = new Output({
  name: "Post",
  fields: {
    id: {
      type: new Required(TInt)
    },
    creator: {
      type: new Required(TUser),
      resolve: creator
    },
    slug: {
      type: new Required(TString)
    },
    title: {
      type: new Required(TString)
    },
    text: {
      type: new Required(TString),
      resolve: text,
      args: {
        format: {
          type: TPostTextEnumInput,
          description: "If set, convetrs to a specified format",
          defaultValue: "md"
        }
      }
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
