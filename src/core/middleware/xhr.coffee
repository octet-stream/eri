isXhr = (ctx, next) ->
  ctx.isXhr = ctx.request.get(
    "x-requested-with"
  ).toLowerCase() is "xmlhttprequest"

  await do next

module.exports = isXhr
