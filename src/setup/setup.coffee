pify = require "pify"
prompt = require "./helper/prompt"
# migrate = require "./migrate"

ora = do require "ora"
{exec} = pify require "child_process"
{write} = require "node-yaml"

QUESTIONS =
  app:
    name: "Your project name:"
    host: "Project hostname (like http://example.com):"

###
# Create user.yaml config
###
configure = ->
  userConfig = await prompt QUESTIONS
  await write "../configs/user.yaml", userConfig

###
# Create symbolic link if not exists
# Important note: I think it's compatible only with *nix
###
link = ->
  try
    await exec "which eri"
  catch err
    process.stdout.write String await exec "npm link"

setup = (cmd) ->
  unless cmd.S
    await do configure

  migrate = require "./migrate"

  await migrate cmd
  await do link

module.exports = setup
