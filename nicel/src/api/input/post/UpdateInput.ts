import {InputType, Field, ID} from "type-graphql"

@InputType()
class PostUpdateInput {
  @Field(() => ID, {nullable: false})
  id!: number

  @Field({nullable: true})
  title?: string

  @Field({nullable: true})
  text?: string

  @Field({nullable: true})
  isDraft?: boolean
}

export default PostUpdateInput
