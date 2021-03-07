import {ObjectType, Field} from "type-graphql"

import User from "server/entity/User"

@ObjectType()
class Viewer extends User {
  @Field()
  email!: string
}

export default Viewer
