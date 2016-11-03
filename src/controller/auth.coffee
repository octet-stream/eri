user = require "../model/user"
passport = require "koa-passport"
{Strategy} = require "passport-local"

NotFoundException = require "../core/error/NotFound"
NotAllowedException = require "../core/error/NotAllowed"

passport.serializeUser (userId, cb) -> cb null, userId
passport.deserializeUser user.getAuthenticated

passport.use new Strategy
  usernameField: "username"
  passwordField: "pass",
  user.signin

actionSignin = (ctx) ->
  return ctx.redirect "/" if ctx.req.user?
  await ctx.render "auth/signin", title: "Signin"

actionLogin = (ctx) -> await return ctx.redirect ctx.query.rd or "/"

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
    .post passport.authenticate("local"), actionLogin

  r "/auth/signup/:token"
    .get actionSignup
    .post actionRegister
