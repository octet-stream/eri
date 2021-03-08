import {InputType, Field} from "type-graphql"

@InputType()
class AuthSignUpInput {
  @Field()
  login!: string

  @Field()
  email!: string

  @Field()
  password!: string
}

export default AuthSignUpInput
