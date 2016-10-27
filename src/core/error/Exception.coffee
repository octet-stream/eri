"use strict"

class Exception
  constructor: (name, @message, @status = 500, props) ->
    @name = "Exception"
    @properties =
      error: props ? {
        status: @status
        message: "I don't know what went wrong"
      }

    Error.captureStackTrace this, Exception

module.exports = Exception
