import {Resolver, Query, Mutation, Arg} from "type-graphql"

import User from "server/model/User"

@Resolver(() => User)
class UserResolver {
  @Query(() => User, {nullable: false})
  user(@Arg("username", {nullable: false}) username: string) {
    return User.findOne({where: [{login: username}, {email: username}]})
  }

  @Mutation(() => Boolean, {nullable: false})
  userAdd() {}
}

export default UserResolver
