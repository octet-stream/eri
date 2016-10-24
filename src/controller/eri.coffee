'use strict'
debug = require 'debug'
user = new User = require '../model/User'

passport = require 'koa-passport'
{Strategy} = require 'passport-local'

passport.serializeUser (iUserId, cb) -> cb null, iUserId
passport.deserializeUser user.getAuthenticated

passport.use new Strategy
  usernameField: 'username'
  passwordField: 'pass',
  user.auth

actionIndex = (next) ->
  unless do @req.isAuthenticated
    @render 'eri/signin',
      title: 'Authorization'
      __csrf: @csrf
    return

  @render 'eri/index'
  yield next

actionSignin = (next) ->
  {username, pass} = @request.body
  @redirect '/eri'
  yield next

actionInvite = (next) ->
  @render 'eri/invite',
    __csrf: @csrf

  yield next

actionLogout = (next) ->
  do @logout
  @redirect '/eri'
  yield next

init = (route) ->
  route '/eri'
    .get actionIndex
    .post passport.authenticate('local'), actionSignin

  route '/eri/invite'
    .get actionInvite

  route '/eri/logout'
    .get actionLogout

module.exports = init
