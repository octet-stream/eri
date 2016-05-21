# Router = require 'koa-router'
requireHelper = require 'require-dir'

{realpathSync} = require 'fs'
{EventEmitter} = require 'events'
{isFunction} = require 'lodash'
{warn} = require '../logger'

NotFoundException = require '../errors/NotFound'
NotAllwedException = require '../errors/NotAllowed'

CONTROLLERS = realpathSync "#{__dirname}/../../controller"

# router = new Router # Create Router instance
router = require 'koa-routing'

actionNotFound = (next) ->
  throw new NotFoundException "Page not found on route #{@url}"
  yield next

actionNotAllowed = (next) ->
  throw new NotAllwedException "
    Unknown method #{@method} on route #{@url}
  "
  yield next

controller = (app) ->
  # Set router middleware
  app.use router app

  # Require all controllers
  oControllers = requireHelper CONTROLLERS

  for __sName, __controller of oControllers
    unless isFunction __controller
      warn "Controller \"#{__sName}\" is not a function."
      continue

    __controller app.route

  # Error pages
  app.route '*'
    .get actionNotFound
    .all actionNotAllowed

  return router

module.exports = controller
