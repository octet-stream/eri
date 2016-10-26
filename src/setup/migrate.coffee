fs = require "promise-fs"
db = require "../core/database"
redis = require "then-redis"
moment = require "moment"
shortid = require "shortid"
prompt = require "./helper/prompt"
# bcrypt = require "../core/helper/bcrypt"
requireHelper = require "../core/helper/require"

ora = do require "ora"
{realpathSync} = require "fs"
{isFunction, assign} = require "lodash"
{info} = require "figures"
{cyan} = require "chalk"

ERI_ROOT = realpathSync "#{__dirname}/../"
schemas = requireHelper "#{ERI_ROOT}/core/database/schema"

###
# Load all schemas to database
#
# @params boolean notErase
###
loadSchemas = (notErase = off) ->
  ora.text = "Loading schemas..."

  for own __k, __sch of schemas when isFunction __sch
    await db(__k, __sch).sync force: not notErase, logging: off

  await return

createSu = ->

migrate = (cmd) ->
  do ora.start
  ora.color = "magenta"

  await loadSchemas cmd.E
  do ora.stop

  await return

module.exports = migrate
