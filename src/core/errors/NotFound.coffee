HttpException = require './HttpException'

###
# Not Found Exception
###
class NotFoundException extends HttpException
  constructor: (@message, props = {}) ->
    @name = 'NotFoundException'
    @status = 404

    super @name, @message, @status, props


module.exports = NotFoundException
