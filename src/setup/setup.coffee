pify = require "pify"
prompt = require "./helper/prompt"

ora = do require "ora"
{exec} = pify require "child_process"
{write} = require "node-yaml"

QUESTIONS =
  app:
    name: "Your blog name:"
    host: "Blogt hostname (like http://example.com):"

###
# Create user.yaml config
###
configure = ->
  return await write "../configs/user.yaml", await prompt QUESTIONS

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
  await do configure if cmd.C

  migrate = require "./migrate"

  await migrate cmd
  await do link

module.exports = setup
