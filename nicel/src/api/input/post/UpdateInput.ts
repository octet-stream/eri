import {InputType, Field, ID} from "type-graphql"

@InputType()
class PostUpdateInput {
  @Field(() => ID, {nullable: false})
  id!: number

  @Field()
  title?: string

  @Field()
  text?: string

  @Field()
  isDraft?: boolean
}

export default PostUpdateInput
