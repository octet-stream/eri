'use strict'

{warn, err} = logger = require '../logger'

handle = (err) ->
  logger.err err.stack
  @status = err.status or 500
  @body = 'Something\'s broke: ' + err.status

errorHandler = (next) ->
  try
    yield next
  catch err
    handle.call this, err

  return

module.exports = errorHandler
