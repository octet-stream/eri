'use strict'

{warn, err} = require '../logger'

handle = (err) ->
  console.log err.status
  @body = 'foo'

errorHandler = (next) ->
  try
    yield next
  catch err
    handle.call @, err

module.exports = errorHandler
