"use strict"

HttpException = require "./HttpException"
{assign} = require "lodash"

class NotAllowedException extends HttpException
  constructor: (@message, props) ->
    @name = "NotAllowedException"
    @status = 405

    super @name, @message, @status, assign {@status}, props

module.exports = NotAllowedException
