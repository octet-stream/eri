import {GraphQLString as TString} from "graphql"

// This module will be removed once I'll figure out the app's structure
const fields = {
  type: TString,
  resolve() {
    return "Hello, world!"
  }
}

export default fields
