import {Resolver, Query, Arg, Args, Ctx, Authorized} from "type-graphql"
import {InjectRepository} from "typeorm-typedi-extensions";

import ApiContext from "server/type/Context"

import User from "server/entity/User"
import UserRepo from "server/repo/User"

import PageArgs from "server/api/args/PageArgs"
import Viewer from "server/api/type/user/Viewer"

import {UserPage, UserPageParams} from "server/api/type/user/UserPage"

@Resolver(() => User)
class UserResolver {
  @InjectRepository()
  private readonly userRepo: UserRepo

  @Query(() => UserPage)
  async users(
    @Args(() => PageArgs) {limit, offset, page}: PageArgs
  ): Promise<UserPageParams> {
    const [rows, count] = await this.userRepo.findAndCount({
      skip: offset, take: limit
    })

    return {rows, count, limit, offset, page}
  }

  @Query(() => User)
  user(@Arg("username") username: string) {
    return this.userRepo.findByUsername(username)
  }

  @Authorized()
  @Query(() => Viewer, {description: "Returns information for current user"})
  viewer(@Ctx() ctx: ApiContext): Promise<Viewer> {
    return this.userRepo.findOne(ctx.req.session.userId)
  }
}

export default UserResolver
