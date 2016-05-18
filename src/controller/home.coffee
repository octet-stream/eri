actionIndex = ->
  @status = 200
  @render 'home/index'

actionAbout = ->
  @status = 200
  @body = 'About page'

actionSignin = ->
  @status = 200
  @body = 'Login page'

init = (router) ->
  router
    .get '/', actionIndex
    .get '/about', actionAbout
    .get '/eri', actionSignin

module.exports = init
