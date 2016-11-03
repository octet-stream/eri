"use strict"

{compile} = require "pug"
{merge, isPlainObject} = require "lodash"

{realpathSync} = require "fs"
{readFile} = require "promise-fs"
{app: {name, credits, theme}, IS_DEVEL} = require "../helper/configure"
{version, codename} = require "../../package.json"

theme or= "eri"
VIEWS = realpathSync "#{__dirname}/../../theme/#{theme}/view"
{NODE_ENV} = process.env

config = null

# Tiny cache for rendered templates :D
cache = {}

defaults =
  views: VIEWS
  debug: IS_DEVEL
  cache: not IS_DEVEL

eri =
  name: name
  version: version
  codename: codename
  theme: theme

compiler = (filename) ->
  content = await readFile filename
  await return compile content, merge {}, config, filename: filename

render = (filename, values) ->
  fn = unless filename of cache
    __ref = await compiler "#{defaults.views}/#{filename}.pug"
    if config.cache
      cache[filename] = __ref
    else
      __ref
  else
    cache[filename]

  values = merge {}, values, {
    user: @req.user
    eri,
    sys: {
      @csrf, @url, @path, rd: @query.rd or "/"
    }
  }

  @body = fn values

init = (koa, custom = {}) ->
  config = merge {}, defaults, custom, pretty: no
  koa.context.render = render

module.exports = init
