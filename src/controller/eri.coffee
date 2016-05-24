'use strict'

user = new User = require '../model/User'

passport = require 'koa-passport'

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
  yield next

actionInvite = (next) ->
  @render 'eri/invite',
    __csrf: @csrf

  yield next

init = (route) ->
  route '/eri'
    .get actionIndex
    .post actionSignin

  route '/eri/invite'
    .get actionInvite

module.exports = init
