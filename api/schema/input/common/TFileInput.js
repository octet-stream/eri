import {
  GraphQLInputObjectType as Input,
  GraphQLNonNull as Required,
  GraphQLString as TString
} from "graphql"

const TFileInput = new Input({
  name: "FileInput",
  fields: {
    originalFilename: {
      type: new Required(TString)
    },
    filename: {
      type: new Required(TString)
    },
    path: {
      type: new Required(TString)
    },
    mime: {
      type: new Required(TString)
    },
    basename: {
      type: new Required(TString)
    },
    extname: {
      type: new Required(TString)
    },
    enc: {
      type: new Required(TString)
    }
  }
})

export default TFileInput
