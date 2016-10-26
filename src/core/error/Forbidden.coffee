HttpException = require "./HttpException"
{assign} = require "lodash"

class ForbiddenException extends HttpException
  constructor: (@message, props) ->
    @name = "FrobiddenException"
    @status = 403

    super @name, @message, @status, assign {@status}, props

module.exports = ForbiddenException
