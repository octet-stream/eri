"use strict"

Koa = require "koa"
convert = require "koa-convert"
serve = require "koa-static"
favicon = require "koa-favicon"
bodyparser = require "koa-bodyparser"
sess = require "koa-generic-session"
redisStore = require "koa-redis"
passport = require "koa-passport"
compress = require "koa-compress"
controller = require "./controller"
view = require "./view"
config = require "../helper/configure"
isXhr = require "../middleware/xhr"
multipart = require "../middleware/multipart"
errorHandler = require "../middleware/error-handler"
logger = require "../middleware/logger"

{default: CSRF} = require "koa-csrf"
{ok, info, normal}  = require "../logger"
{readFileSync, realpathSync} = require "fs"
{app: {name, port, theme, lang}, session, IS_DEVEL} = config
PUBLIC_DIR = realpathSync "#{__dirname}/../../themes/#{theme}/public"
koa = new Koa
koa.keys = [session.secret]

normal "Init Eri middlewares"

# Check xhr request
koa
  .use isXhr

  # Set error handler
  .use errorHandler

  # Compress static
  .use do compress

  # Serve favicon and static files
  # .use favicon "#{PUBLIC_DIR}/img/icns/favicons/ponyfiction-js.ico"
  .use serve PUBLIC_DIR

  # Logger middleware for any requests
  .use logger

  # Bodyparser
  .use do bodyparser
  .use multipart

  # Session
  .use convert sess
    store: do redisStore
    prefix: session.prefix
    key: "#{session.prefix}#{session.sessidName}"
    cookie:
      maxAge: 1000 * 60 * 60 * 24 * 360 # One year in ms

  # Csrf tokens
  .use new CSRF

  # Passport
  .use do passport.initialize
  .use do passport.session

  # Set controllers
  .use do controller.routes
  .use do controller.allowedMethods

# Set view engine
view koa, debug: off

normal "
  Run Eri server for #{process.env.NODE_ENV or "development"} environment
"

# Run server
do ->
  try
    # TODO: Test this code with "Let's encrypt!" certificates.
    CERTS = realpathSync "#{__dirname}/../../configs/cert"
    options =
      key: readFileSync "#{CERTS}/eri.key"
      cert: readFileSync "#{CERTS}/eri.crt"
    require "http2"
      .cteateServer options, do koa.callback
      .listen port
    info "Starting with HTTP2 server."
  catch err
    koa.listen port
  ok "Eri started on http://localhost:#{port}"

process.on "SIGINT", -> process.exit 0
