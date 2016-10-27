"use strict"

actionIndex = (ctx) ->
  ctx.render "home/home" 
  await return

init = (r) ->
  r "/"
    .get actionIndex

module.exports = init
