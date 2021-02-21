import {
  GraphQLObjectType as Output,
  GraphQLNonNull as Required,
  GraphQLBoolean as TBoolean,
  GraphQLString as TString,
  GraphQLInt as TInt,
} from "graphql"

import TPostTextEnumInput from "server/api/input/post/TPostTextFormatsInput"

import TDates from "server/api/type/common/TDates"
import TUser from "server/api/type/user/TUser"

import text from "server/api/resolve/query/post/text"
import dates from "server/api/resolve/query/common/dates"
import author from "server/api/resolve/query/post/author"

const TPost = new Output({
  name: "Post",
  fields: {
    id: {
      type: new Required(TInt)
    },
    author: {
      type: new Required(TUser),
      resolve: author
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
