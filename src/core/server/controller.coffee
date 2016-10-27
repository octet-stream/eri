"use strict"

requireHelper = require "../helper/require"

{realpathSync} = require "fs"
{isFunction} = require "lodash"
{warn} = require "../logger"

NotFoundException = require "../error/NotFound"
NotAllwedException = require "../error/NotAllowed"

CONTROLLERS = realpathSync "#{__dirname}/../../controller"

Router = require "koa-router"
router = new Router

wrapRouter = (path) ->
  methods =
    get: (actions...) ->
      router.get path, actions...
      return methods
    post: (actions...) ->
      router.post path, actions...
      return methods
    patch: (actions...) ->
      router.patch path, actions...
      return methods
    put: (actions...) ->
      router.put path, actions...
      return methods
    delete: (actions...) ->
      router.delete path, actions...
      return methods
    all: (actions...) ->
      router.all path, actions...
      return methods

###
# Throwing NotFoundException for unknown routes on GET method
###
actionNotFound = (ctx) ->
  throw new NotFoundException "Page not found on route #{ctx.url}"
  await return

###
# Throwing NotAllwedException for unknown methods on any routes
###
actionNotAllowed = (ctx) ->
  throw new NotAllwedException "
    Unknown method #{ctx.method} on route #{ctx.url}
  "
  await return

controller = ->
  # Require all controllers
  controllers = requireHelper CONTROLLERS

  for own __name, __controller of controllers
    unless isFunction __controller
      warn "Controller \"#{__name}\" is not a function."
      continue

    # Init routes
    __controller wrapRouter

  # Error pages
  wrapRouter "*"
    .get actionNotFound
    .all actionNotAllowed

  return router

module.exports = do controller
