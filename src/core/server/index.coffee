koa = require 'koa'
serve = require 'koa-static'
sess = require 'koa-generic-session'
redisStore = require 'koa-redis'
csrf = require 'koa-csrf'
passport = require 'koa-passport'
controller = require './controller'
view = require './view'
errorHandler = require '../errors/error-handler'
{app: {theme, port}, session} = require '../helpers/configure-helper'

{realpathSync} = require 'fs'
{logger, normal, ok} = require '../logger'

app = do koa
app.keys = [session.secret]

# Set error handler
app.use errorHandler

# Session
app.use sess
  store: do redisStore
  prefix: session.prefix
  key: "#{session.prefix}#{session.sessidName}"

csrf app
app.use csrf.middleware

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
