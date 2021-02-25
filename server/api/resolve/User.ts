import {Resolver, Query, Arg, Ctx, Authorized} from "type-graphql"

import ApiContext from "type/api/Context"

import User from "server/model/User"

import Viewer from "server/api/type/user/Viewer"

@Resolver(() => User)
class UserResolver {
  @Query(() => User)
  user(@Arg("username") username: string) {
    return User.findOne({where: [{login: username}, {email: username}]})
  }

  @Authorized()
  @Query(() => Viewer, {description: "Returns information for current user"})
  viewer(@Ctx() ctx: ApiContext): Promise<Viewer> {
    return User.findOne(ctx.req.session.userId)
  }
}

export default UserResolver
