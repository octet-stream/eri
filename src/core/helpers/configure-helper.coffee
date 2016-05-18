{readSync} = require 'node-yaml'
{merge} = require 'lodash'
{realpathSync} = require 'fs'

oConfig = null

configure = ->
  CONFIGS_ROOT = realpathSync "#{__dirname}/../../configs"

  # Trying to read user-config
  try
    __oUserConfig = readSync "#{CONFIGS_ROOT}/user"
  catch err
    # Set default value if user-config is not exists
    __oUserConfig = {}

  __oDefaultConfig = readSync "#{CONFIGS_ROOT}/default"
  return merge __oDefaultConfig, __oUserConfig

module.exports = oConfig or= do configure
