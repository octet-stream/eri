'use strict'

HttpException = require './HttpException'

class NotAllowedException extends HttpException
  constructor: (@message, props = {}) ->
    @name = 'NotAllowedException'
    @status = 405

    super @name, @message, @status, props

module.exports = NotAllowedException
