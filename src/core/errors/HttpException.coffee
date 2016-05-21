'use strict'

Exception = require './Exception'

###
# Http Exception
###
class HttpException extends Exception
  constructor: (name, message, status, props = {}) ->
    @name = name or 'HttpException'
    @message = message ? 'Internal Server Error'
    @status = status or 500

    super @name, @message, @status, props

module.exports = HttpException
