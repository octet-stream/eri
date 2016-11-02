{warn, err} = logger = require "../logger"

whoops = -> """
  <!DOCTYPE html>
  <html>
    <head>
      <title>Something's broke</title>
    </head>
    <body>
      Whoops... Something's totally broke.<br><br>
      If you're an owner of this resource,
      please, contact with your system administrator
      or 
      <a href="https://github.com/octet-stream/eri/issues/new">
        Eri's developers
      </a>.
    </body>
  </html>
"""

errorHandler = (ctx, next) ->
  try
    await do next
  catch error
    {stack, status, properties} = error

    err stack

    status ?= 500
    ctx.status = status

    try
      await ctx.render "error/http/#{status}"
    catch error
      ctx.res.setHeader "Content-type", "text/html"
      ctx.status = 500
      ctx.body = do whoops

module.exports = errorHandler
