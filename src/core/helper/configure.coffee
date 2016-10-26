{readSync} = require "node-yaml"
{merge} = require "lodash"
{realpathSync} = require "fs"
freeze = require "deep-freeze"

setEnv = (env = "development") ->
  if env in ["pro", "prod", "production"] then "production" else "development"

configure = ->
  CONFIGS_ROOT = realpathSync "#{__dirname}/../../configs"

  # Trying to read user-config
  try
    userConfig = readSync "#{CONFIGS_ROOT}/user"
  catch err
    throw err unless err.code is "ENOENT"

    # Set default value if user-config is not exists
    userConfig = {}

  defaultConfig = readSync "#{CONFIGS_ROOT}/default"
  config = merge {}, defaultConfig, userConfig

  config.IS_DEVEL = do ->
      NODE_ENV = process.env.NODE_ENV or= setEnv config.app.env
      unless NODE_ENV is "production" then yes else no

  return config

module.exports = freeze do configure
