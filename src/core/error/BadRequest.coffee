"use strict"

HttpException = require "./HttpException"

{assign} = require "lodash"

class BadRequestException extends HttpException
  constructor: (@message, props) ->
    @name = "BadRequestException"
    @status = 400

    super @name, @message, @status, assign {@status}, props


module.exports = BadRequestException
