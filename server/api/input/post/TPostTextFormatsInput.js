import {GraphQLEnumType as Enum} from "graphql"

const TPostTextFormatsInput = new Enum({
  name: "PostTextFormatsInput",
  values: {
    html: {
      value: "html"
    },
    md: {
      value: "md"
    }
  }
})

export default TPostTextFormatsInput
