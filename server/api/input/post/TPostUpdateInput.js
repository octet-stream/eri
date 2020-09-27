import {
  GraphQLInputObjectType as Input,
  GraphQLNonNull as Required,
  GraphQLString as TString,
  GraphQLBoolean as TBoolean,
  GraphQLInt as TInt
} from "graphql"

const TPostUpdateInput = new Input({
  name: "PostUpdateInput",
  fields: {
    id: {
      type: new Required(TInt)
    },
    title: {
      type: new Required(TString)
    },
    text: {
      type: new Required(TString)
    },
    isDraft: {
      type: TBoolean
    }
  }
})

export default TPostUpdateInput
