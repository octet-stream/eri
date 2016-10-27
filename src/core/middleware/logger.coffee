{normal} = require "../logger"
{grey, green, yellow, red} = require "chalk"

arrowRight = grey "->"
arrowLeft = grey "<-"

statusColor = (status) ->
  return green "#{status}" if 200 >= status < 300
  return grey "#{status}" if 300 >= status < 400

  # Maybe I don't need this code.
  return yellow "#{status}" if 400 >= status < 500
  return red "#{status}" if status >= 500

logger = (ctx, next) ->
  normal "#{ctx.request.ip} #{arrowRight} #{ctx.method} #{decodeURI ctx.url}"
  await do next
  normal "
    #{ctx.request.ip} #{arrowLeft} 
    #{statusColor ctx.status} #{decodeURI ctx.url}
  "

module.exports = logger
