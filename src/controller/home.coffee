'use strict'

actionIndex = (next) ->
  @render 'home/index'
  yield next

init = (route) ->
  route '/'
    .get actionIndex

module.exports = init
