import {ObjectType, Field} from "type-graphql"

@ObjectType()
class Dates {
  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date

  @Field({nullable: true})
  deletedAt?: Date
}

export default Dates
