import {
  GraphQLInputObjectType as Input,
  GraphQLNonNull as Required,
  GraphQLString as TString,
  GraphQLBoolean as TBoolean
} from "graphql"

const TPostAddInput = new Input({
  name: "PostAddInput",
  fields: {
    title: {
      type: new Required(TString)
    },
    text: {
      type: new Required(TString)
    },
    isDraft: {
      type: TBoolean,
      defaultValue: true
    }
  }
})

export default TPostAddInput
