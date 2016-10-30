"use strict"

{compile} = require "pug"
{assign, merge} = require "lodash"

{realpathSync, readFileSync} = require "fs"
{app: {name, credits, theme}, IS_DEVEL} = require "../helper/configure"
{version, codename} = require "../../package.json"

theme or= "eri"
VIEWS = realpathSync "#{__dirname}/../../theme/#{theme}/view"
{NODE_ENV} = process.env

config = null

# Tiny-tiny cache for templates :D
cache = {}

defaults =
  views: VIEWS
  debug: IS_DEVEL
  cache: not IS_DEVEL

locals =
  name: name
  version: version
  codename: codename
  theme: theme

compiler = (filename) ->
  sContent = readFileSync filename
  compile sContent, assign config, filename: filename

renderer = (filename, opts) ->
  fn = unless filename of cache
    __ref = compiler "#{defaults.views}/#{filename}.pug"
    if config.cache
      cache[filename] = __ref
    else
      __ref
  else
    cache[filename]

  @body = fn assign merge({
    user: @req.user
    __return: @url
  }, opts), locals

init = (app, custom = {}) ->
  config = merge defaults, custom, pretty: no
  app.context.render = renderer

module.exports = init
