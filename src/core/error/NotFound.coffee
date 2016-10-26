"use strict"

HttpException = require "./HttpException"

{assign} = require "lodash"

###
# Not Found Exception
###
class NotFoundException extends HttpException
  constructor: (@message, props) ->
    @name = "NotFoundException"
    @status = 404

    super @name, @message, @status, assign {@status}, props


module.exports = NotFoundException
