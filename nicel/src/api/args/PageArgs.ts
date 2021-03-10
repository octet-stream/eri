import {ArgsType, Field, Int} from "type-graphql"
import {Min} from "class-validator"

@ArgsType()
class PageArgs {
  @Field(() => Int, {defaultValue: 1})
  @Min(0)
  page?: number

  @Min(0)
  @Field(() => Int, {defaultValue: 10})
  limit?: number

  get offset(): number {
    return this.limit * (this.page - 1)
  }
}

export default PageArgs
