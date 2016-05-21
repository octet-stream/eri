koa = require 'koa'
serve = require 'koa-static'
errorHandler = require '../errors/error-handler'
controller = require './controller'
view = require './view'
{realpathSync} = require 'fs'
{logger, normal, ok} = require '../logger'
{app: {port, theme}} = require '../helpers/configure-helper'

app = do koa

# Set error handler
app.use errorHandler

# Serve static files
app.use serve realpathSync "#{__dirname}/../../themes/#{theme}/public"

# Set logger
app.use logger

# Controller
controller app

# View
view app

app.listen port, ->
  ok "Eri started on http://localhost:#{port}"
