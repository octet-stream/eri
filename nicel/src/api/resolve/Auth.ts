import {Resolver, Mutation, Arg, Ctx, ID, Authorized} from "type-graphql"
import {InjectRepository} from "typeorm-typedi-extensions"

import Context from "type/Context"

import unauthorized from "error/common/unauthorized"

import SignUpInput from "api/input/auth/SignUpInput"
import LogInInput from "api/input/auth/LogInInput"

import Viewer from "api/type/user/Viewer"

import UserRepo from "repo/User"

@Resolver()
class AuthResolver {
  @InjectRepository()
  private readonly userRepo: UserRepo

  @Mutation(() => Viewer)
  async authSignUp(
    @Ctx() ctx: Context,
    @Arg("user", () => SignUpInput) user: SignUpInput
  ): Promise<Viewer> {
    const created = await this.userRepo.createAndSave(user)

    ctx.session.userId = created.id

    return created
  }

  @Mutation(() => Viewer)
  async authLogIn(
    @Ctx() ctx: Context,
    @Arg("credentials", () => LogInInput) {username, password}: LogInInput
  ): Promise<Viewer> {
    const user = await this.userRepo.findOne({
      where: [{email: username}, {login: username}]
    })

    if (!(user || await user.comparePassword(password))) {
      throw unauthorized("Auth failed: Check your credentials")
    }

    ctx.session.userId = user.id

    return user
  }

  @Authorized()
  @Mutation(() => ID)
  authLogOut(@Ctx() ctx: Context): number {
    const {userId} = ctx.session

    ctx.session = null

    return userId
  }
}

export default AuthResolver
