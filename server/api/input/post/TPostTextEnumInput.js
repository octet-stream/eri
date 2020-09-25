import {GraphQLEnumType as Enum} from "graphql"

const TPostTextEnumInput = new Enum({
  name: "PostTextEnumInput",
  values: {
    html: {
      value: "html"
    },
    md: {
      value: "md"
    }
  }
})

export default TPostTextEnumInput
