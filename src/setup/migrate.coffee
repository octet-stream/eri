fs = require "promise-fs"
db = require "../core/database"
pify = require "pify"
redis = require "then-redis"
moment = require "moment"
shortid = require "shortid"
prompt = require "./helper/prompt"
bcrypt = require "../core/helper/bcrypt"
requireHelper = require "../core/helper/require"

ora = do require "ora"
{realpathSync} = require "fs"
{isFunction, assign} = require "lodash"
{info} = require "figures"
{cyan} = require "chalk"
{spawn} = require "child_process"
{log} = console

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

###
# Make server for owner registration
###
spawnMockServer = (stackTrace = no) -> new Promise (resolve, reject) ->
  onStdout = (message) ->
    log String message
    ora.text = "Waiting..."
    do ora.start

  onStderr = (message) ->
    ora.text = String message
    do ora.fail

  onClose = (code) ->
    if code is 0
      do resolve
    else
      reject new ReferenceError "Process was exit with non-zero code."

  onError = (err) -> reject err

  args = ["#{__dirname}/server"]
  args.push "--stack-strace" if stackTrace

  spawnedProcess = spawn "node", args
    .on "close", onClose
    .on "errror", onError

  spawnedProcess.stdout.on "data", onStdout
  spawnedProcess.stderr.on "data", onStderr
  return

###
# Create account of owner
###
createSu = (cmd) ->
  return await spawnMockServer cmd.T unless cmd.R

  user = db "user", schemas.user

  {login} = await prompt login: "Type your login for Twi app:"
  {email} = await prompt email: "Type your email:"

  loop
    {password} = await prompt password: [
      type: "password"
      message: "Enter your password:"
    ]
    {repass} = await prompt repass: [
      type: "password"
      message: "Enter your password again:"
    ]

    break if password is repass

  if (__user = await user.findOne raw: on, logging: no, where: role: 3)?
    return log "#{cyan info} Owner account is already exists: #{__user.login}"

  ora.text = "Creating your account..."
  do ora.start

  await user.create {
    login, email, password: await bcrypt.hash password, 10
    registeredAt: (do moment().format), role: 3, status: 1
  }, logging: no

  await return

migrate = (cmd) ->
  do ora.start
  ora.color = "magenta"

  await loadSchemas cmd.E
  do ora.stop

  await createSu cmd unless cmd.S
  await return

module.exports = migrate
