NotFoundException = require "../core/error/NotFound"
NotAllowedException = require "../core/error/NotAllowed"

actionSignin = (ctx) -> await ctx.render "auth/signin", title: "Signin"

actionLogin = (ctx) -> await return

actionSignup = (ctx) ->
  unless ctx.params.token
    throw new NotFoundException "
      Unallowed access to registration: invalid token
    "

  await return

actionRegister = (ctx) ->
  unless ctx.params.token
    throw new NotAllowedException "
      Unallowed access to registration: invalid token
    "

  await return

module.exports = (r) ->
  r "/auth/signin"
    .get actionSignin
    .post actionLogin

  r "/auth/signup/:token"
    .get actionSignup
    .post actionRegister
