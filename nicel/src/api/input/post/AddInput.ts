import {InputType, Field} from "type-graphql"

@InputType()
class PostAddInput {
  @Field({nullable: false})
  title!: string

  @Field({nullable: false})
  text!: string

  @Field({defaultValue: true})
  isDraft!: boolean
}

export default PostAddInput
