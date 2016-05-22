'use strict'

{warn, err} = require '../logger'

handle = (err) ->
  console.log err.stack
  @status = err.status
  @body = 'Something\'s broke: ' + err.status

errorHandler = (next) ->
  try
    yield next
  catch err
    handle.call @, err

module.exports = errorHandler
