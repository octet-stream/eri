"use strict"

actionIndex = (ctx) ->
  ctx.body = "Hello, I'm Eri!"
  await return

init = (r) ->
  r "/"
    .get actionIndex

module.exports = init
