import {Resolver, Query, Arg, Args, Ctx, Authorized} from "type-graphql"

import ApiContext from "server/type/Context"

import User from "server/model/User"

import PageArgs from "server/api/args/PageArgs"
import Viewer from "server/api/type/user/Viewer"

import {UserPage, UserPageParams} from "server/api/type/user/UserPage"

@Resolver(() => User)
class UserResolver {
  @Query(() => UserPage)
  async users(
    @Args(() => PageArgs) {limit, offset, page}: PageArgs
  ): Promise<UserPageParams> {
    const [rows, count] = await User.findAndCount({skip: offset, take: limit})

    return {rows, count, limit, offset, page}
  }

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
