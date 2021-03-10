import {InputType, Field} from "type-graphql"

@InputType()
class AuthLogInInput {
  @Field({description: "User email or login"})
  username!: string

  @Field()
  password!: string
}

export default AuthLogInInput
