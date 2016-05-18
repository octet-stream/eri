'use strict'

colors = require 'colors'
moment = require 'moment'

{app: {env}} = require '../helpers/configure-helper'

write = (sMessage) -> process.stdout.write "#{sMessage}\n"

writeErr = (sMessage) -> process.stderr.write "#{sMessage}\n"

###
# Logging levels
###
LOG_NORMAL = 0
LOG_OK = 1
LOG_INFO = 2
LOG_WARN = 3
LOG_ERR = 4

###
# Labels
###
LOG_LABELS = [
  "log"
  "ok".green
  "info".cyan
  "warn".yellow
  "err".red
]

log = (sMessage, iLevel = 0) ->
  if iLevel in [LOG_NORMAL, LOG_OK, LOG_INFO]
    write "[#{LOG_LABELS[[iLevel]]}] #{sMessage}"
  else
    writeErr "[#{LOG_LABELS[[iLevel]]}] #{sMessage}"

normal = (sMessage) -> log sMessage, LOG_NORMAL

ok = (sMessage) -> log sMessage, LOG_OK

info = (sMessage) -> log sMessage, LOG_INFO

warn = (sMessage) -> log sMessage, LOG_WARN

err = (sMessage) -> log sMessage, LOG_ERR

logger = (next) ->
  normal "#{@method} #{@url}"
  yield next

module.exports = log
module.exports.log = log
module.exports.normal = normal
module.exports.ok = ok
module.exports.info = info
module.exports.warn = warn
module.exports.err = err
module.exports.logger = logger
