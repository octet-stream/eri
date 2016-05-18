Router = require 'koa-router'
requireHelper = require 'require-dir'

{realpathSync} = require 'fs'
{EventEmitter} = require 'events'
{isFunction} = require 'lodash'

CONTROLLERS = realpathSync "#{__dirname}/../../controller"

router = new Router # Create Router instance
ee = new EventEmitter # Create EventEmitter instance

actionNotFound = ->
  @status = 404
  @body = 'This is not the web page you are looking for'
  return

actionNotAllowed = ->
  @status = 405
  @body = 'Method not allowed'
  return

controller = ->
  # Require all controllers
  oControllers = requireHelper CONTROLLERS

  for __sName, __controller of oControllers
    unless isFunction __controller
      console.log "Controller \"#{__sName}\" is not a function."
      continue

    __controller router

  # Error pages
  router
    .get '*', actionNotFound
    .all '*', actionNotAllowed

  return router

module.exports = do controller
