import {
  GraphQLInputObjectType as Input,
  GraphQLNonNull as Required,
  GraphQLInt as TInt
} from "graphql"

import TFileInput from "api/schema/input/common/TFileInput"

const TFileAddInput = new Input({
  name: "FileAddInput",
  fields: {
    id: {
      type: new Required(TInt),
      description: "An ID of an entity you want to add a file to."
    },
    file: {
      type: new Required(TFileInput),
      description: "A file to upload."
    }
  }
})

export default TFileAddInput
