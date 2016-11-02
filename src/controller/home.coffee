"use strict"

actionIndex = (ctx) -> await ctx.render "home/home"

init = (r) ->
  r "/"
    .get actionIndex

module.exports = init
