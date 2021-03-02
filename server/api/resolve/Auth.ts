import {Resolver, Mutation, Arg, Ctx, ID, Authorized} from "type-graphql"
import {hash} from "bcrypt"

import createError from "http-errors"

import ApiContext from "server/type/Context"

import SignUpInput from "server/api/input/auth/SignUpInput"
import LogInInput from "server/api/input/auth/LogInInput"

import Viewer from "server/api/type/user/Viewer"

import User from "server/model/User"

@Resolver()
class AuthResolver {
  @Mutation(() => Viewer)
  async authSignUp(
    @Ctx() ctx: ApiContext,
    @Arg("user", () => SignUpInput) user: SignUpInput
  ): Promise<Viewer> {
    user.password = await hash(user.password, 15)

    const created = await User.create(user).save()

    ctx.req.session.userId = created.id

    return created
  }

  @Mutation(() => Viewer)
  async authLogIn(
    @Ctx() ctx: ApiContext,
    @Arg("credentials", () => LogInInput) {username, password}: LogInInput
  ): Promise<Viewer> {
    const user = await User.findOne({
      where: [{email: username}, {login: username}]
    })

    if (!(user || await user.comparePassword(password))) {
      createError(401, "Auth failed: Check your credentials")
    }

    ctx.req.session.userId = user.id

    return user
  }

  @Authorized()
  @Mutation(() => ID)
  authLogOut(@Ctx() ctx: ApiContext): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const id = ctx.req.sessionId

      ctx.req.session.destroy(error => error ? reject(error) : resolve(id))
    })
  }
}

export default AuthResolver
