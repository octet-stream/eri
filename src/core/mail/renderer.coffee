"use strict"

junk = require 'junk'
{readdirSync, realpathSync} = require "fs"
{readFile, readdir} = require "promise-fs"
{basename, extname, dirname} = require "path"
{render} = require "jade"
{app: {host, name, theme}} = require "../helper/configure"

{assign, isPlainObject} = require "lodash"
{t} = i18n = require "../i18n"

PUG_EXT = [".jade", ".pug"]
EMAIL_TEMPLATES = realpathSync "#{__dirname}/../../theme/#{theme}/view/mail"

oLocals = {name, host, t}

normalizePath = (path) ->
  files = await readdir dirname path
  for file in files when (__extname = extname file) in PUG_EXT and junk.not file
    __filename = "#{basename file, __extname}"
    if __filename is basename path
      return "#{dirname path}/#{__filename}#{__extname}"

  return path

###
# Render template with given name and options
#
# @param string name
# @param object
###
renderer = (name, options = {}) ->
  unless typeof name is "string"
    throw new TypeError "Name must be a string."

  unless isPlainObject options
    throw new TypeError "Options must be a plain object."

  options = assign options, oLocals
  path = await normalizePath "#{EMAIL_TEMPLATES}/#{name}"
  content = await readFile path

  return render content, assign options, filename: path

module.exports = renderer
