Koa = require "koa"
koa = new Koa

{app: {port, host}} = require "../../core/helper/configure"
code = do require "shortid"

NotFoundException = require "../../core/error/NotFound"

write = (line) -> process.stdout.write "#{line}"
writeErr = (err) -> process.stderr.write "#{err}"

koa.use (ctx, next) ->
  try
    await do next
  catch err
    writeErr String err
    process.exit 1

koa.use (ctx, next) ->
  unless ctx.url.endsWith code
    return await do next

  if ctx.method is "GET"
    # TODO: render registration page
    ctx.body = "Hello! This is the registeration server."
  else if ctx.method "POST"
    # TODO: Processing user registration
    ctx.body = "Registration will be here..."

  await do next

koa.listen port, ->
  write """
    Registration server started.
    Please, wisit one of the following links to complete the registration:
    From remote client: #{host}/#{code}
    From localhost: http://localhost:#{port}/#{code}
  """

process.on "SIGINT", ->
  writeErr "Server has been closed. Registration canceled."
  process.exit 1
