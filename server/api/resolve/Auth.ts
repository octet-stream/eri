import {Resolver, Mutation, Arg, Ctx, ID, Authorized} from "type-graphql"
import {InjectRepository} from "typeorm-typedi-extensions"

import ApiContext from "server/type/Context"

import unauthorized from "server/error/common/unauthorized"

import SignUpInput from "server/api/input/auth/SignUpInput"
import LogInInput from "server/api/input/auth/LogInInput"

import Viewer from "server/api/type/user/Viewer"

import UserRepo from "server/repo/User"

@Resolver()
class AuthResolver {
  @InjectRepository()
  private readonly userRepo: UserRepo

  @Mutation(() => Viewer)
  async authSignUp(
    @Ctx() ctx: ApiContext,
    @Arg("user", () => SignUpInput) user: SignUpInput
  ): Promise<Viewer> {
    const created = await this.userRepo.createAndSave(user)

    ctx.req.session.userId = created.id

    return created
  }

  @Mutation(() => Viewer)
  async authLogIn(
    @Ctx() ctx: ApiContext,
    @Arg("credentials", () => LogInInput) {username, password}: LogInInput
  ): Promise<Viewer> {
    const user = await this.userRepo.findOne({
      where: [{email: username}, {login: username}]
    })

    if (!(user || await user.comparePassword(password))) {
      throw unauthorized("Auth failed: Check your credentials")
    }

    ctx.req.session.userId = user.id

    return user
  }

  @Authorized()
  @Mutation(() => ID)
  authLogOut(@Ctx() ctx: ApiContext): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const id = ctx.req.session.userId

      ctx.req.session.destroy(error => error ? reject(error) : resolve(id))
    })
  }
}

export default AuthResolver
