{isPlainObject, isArray} = require "lodash"
{prompt} = require "inquirer"
{cross} = require "figures"
{red} = require "chalk"
{log} = console

rescueTypes = (value) ->
  if value in ["null", null]
    return value = null
  else if value in ["false", no]
    return value = no
  else if value in ["true", yes]
    return value = on
  else if "#{Number value}" isnt "NaN" and value isnt ""
    return value = Number value
  else
    return value

###
# Run prompt with error handling for each questions
#
# @param object|array q
#
# @return object
#
# @thorws Error
###
tryPrompt = (q) ->
  loop
    try
      return await prompt if isArray q then q else [q]
    catch err
      if typeof err is "string" then log "#{red cross} #{err}" else throw err

###
# Normalize given questions obj due to Inquirer question format
#  see: https://github.com/SBoudrias/Inquirer.js#question
#
# @param object obj
#
# @return object
###
normalizeQuestions = (obj) ->
  res = {}
  for __k, __v of obj
    if isPlainObject __v
      res[__k] = normalizeQuestions __v
      continue

    if isArray __v
      res[__k] = __v
      continue

    res[__k] = [
      type: "input"
      message: "#{__v}"
    ]

  return res

###
# Run promps with given questions obj
#
# @param object obj
###
runQuestions = (obj) ->
  res = {}
  for __k, __v of obj
    if isPlainObject __v
      res[__k] = await runQuestions __v
      continue

    __v[0].name = __k
    res[__k] = rescueTypes (await tryPrompt __v)[__k]

  await return res

module.exports = (q) -> await runQuestions normalizeQuestions q
