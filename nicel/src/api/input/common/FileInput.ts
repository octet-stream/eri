import {InputType, Field, Int} from "type-graphql"

@InputType()
class FileInput {
  @Field()
  path!: string

  @Field()
  basename!: string

  @Field()
  hash!: string

  @Field()
  mime!: string

  @Field(() => Int)
  size!: number
}

export default FileInput
