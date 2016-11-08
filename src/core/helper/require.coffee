"use strict"

fs = require "fs"
path = require "path"
yaml = require "node-yaml"
junk = require "junk"
{isEmpty, isBoolean, isFunction} = require "lodash"

PARENT_DIRNAME = path.dirname module.parent.filename
delete require.cache[__filename]

###
# Object of require functions
###
oExtensions =
  ".yaml": yaml.readSync
  ".yml": yaml.readSync

###
# Normalize given path
# 
# @param string sPath
# 
# @return string
###
normalizePath = (sPath) ->
  aExtensions = Object.keys oExtensions
  sBasename = path.basename sPath
  sDirname = unless path.isAbsolute sPath
    fs.realpathSync "#{PARENT_DIRNAME}#{path.sep}#{path.dirname sPath}"
  else
    "#{path.dirname sPath}"
  aFilename = fs.readdirSync sDirname

  for __sFilename in aFilename
    __sExtname = path.extname __sFilename
    __sBasename = path.basename __sFilename, __sExtname
    if sBasename is __sBasename and __sExtname in aExtensions
      return "#{sDirname}#{path.sep}#{__sFilename}"

  return "#{sDirname}#{path.sep}#{sBasename}"

###
# Normalize given options
# 
# @param mixed mOptions
# 
# @return object
###
normalizeOptions = (mOptions) ->
  if isBoolean mOptions
    return recursive: mOptions

  return mOptions

###
# Require module from given path.
# 
# @param string sPath
# 
# @return mixed
###
requireFile = (sPath) ->
  unless __sExtname = path.extname sPath
    return

  if __sExtname of oExtensions
    return oExtensions[__sExtname] sPath

  return require sPath

###
# Require all modules from given directory.
#
# @param string sPath - path to directory
# @param boolean bRecursive (false by default)
###
requireDir = (sPath, bRecursive = off) ->
  __ref = {}

  aFilename = fs.readdirSync sPath
  for __sFilename in aFilename when junk.not __sFilename
    __sPath = "#{sPath}#{path.sep}#{__sFilename}"
    unless do fs.statSync(__sPath).isDirectory
      __sExtname = path.extname __sFilename
      __sBasename = path.basename __sFilename, __sExtname
      __ref[__sBasename] = requireFile __sPath
    else
      continue unless bRecursive

      __oContent = requireDir __sPath
      unless isEmpty __oContent
        __ref[__sFilename] = __oContent

  return __ref

###
# Add require function
# 
# @param string sExtname
# @param function func
#   Note: Only synchronous functions has support.
# 
# Example:
# ```
# {setRequireFunction} = require "./require-helper"
# {readSync} = require "node-yaml"
# 
# setRequireFunction ".yaml", readSync
# ```
###
setRequireFunction = (sExtname, func) ->
  if typeof sExtname isnt "string" or isEmpty sExtname
    throw new TypeError "Name must be a string and cannot be empty."

  unless isFunction func
    throw new TypeError "The second parameter must be a function."

  unless sExtname of oExtensions and sExtname in [".yaml", ".yml"]
    oExtensions[sExtname] = func
    return

###
# Unset require function
# 
# @param string sExtname
###
unsetRequireFunction = (sExtname) ->
  if typeof sExtname isnt "string" or isEmpty sExtname
    throw new TypeError "Name must be a string and cannot be empty."

  unless sExtname in [".yaml", ".yml"]
    delete oExtensions[sExtname]
    return

###
# Require helper
# 
# @param string sPath - A path to requiring directory or file
# @param boolean|object mOptions - requireHelper options:
#   - boolean recursive - turn recursive require mode on/off
#     (false by default).
#   - function|object ext - add new require function.
#     Note: "object" means object of require functions.
# 
# @return mixed
# 
# Example:
# ```
# requireHelper = require "../helpers/require-helper"
# 
# oControllers = requireHelper "../../controller"
# # Return controllers as key-value pair
# # => home: [Function]
# ```
# You can found this example in src/core/controller.iced
###
requireHelper = (sPath = ".", mOptions = {}) ->
  unless typeof sPath is "string"
    throw new TypeError "Path must be a string."

  mOptions = normalizeOptions mOptions

  sPath = normalizePath sPath
  unless do fs.statSync(sPath).isDirectory
    return requireFile sPath

  return requireDir sPath, mOptions.recursive

module.exports = requireHelper
module.exports.setRequireFunction = setRequireFunction
module.exports.unsetRequireFunction = unsetRequireFunction
