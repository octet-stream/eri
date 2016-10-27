"use strict"

Exception = require "./Exception"
{assign} = require "lodash"

###
# Http Exception
###
class HttpException extends Exception
  constructor: (name, msg, status, props) ->
    @name = name or "HttpException"
    @message = msg ? "I don't know wat went wrong"
    @status = status or 500

    super @name, @message, @status, assign {@status}, props

module.exports = HttpException
