import {
  GraphQLObjectType as Output,
  GraphQLNonNull as Required
} from "graphql"

import {GraphQLDateTime as TDateTime} from "graphql-iso-date"

import serialize from "lib/helper/graphql/serializeDate"

const TDates = new Output({
  name: "Dates",
  fields: {
    createdAt: {
      type: new Required(TDateTime),
      resolve: serialize("createdAt"),
      description: "The date when story has been created."
    },
    updatedAt: {
      type: new Required(TDateTime),
      resolve: serialize("updatedAt"),
      description: "The date of last entity update."
    },
    deletedAt: {
      type: TDateTime,
      resolve: serialize("deletedAt"),
      description: "The date entity's was removed."
    }
  }
})

export default TDates
