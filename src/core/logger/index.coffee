"use strict"

figures = require "figures"
chalk = require "chalk"
moment = require "moment"

write = (message) -> process.stdout.write "#{message}\n"

writeErr = (message) -> process.stderr.write "#{message}\n"

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
  chalk.white figures.pointer
  chalk.green figures.tick
  chalk.cyan figures.info
  chalk.yellow figures.warning
  chalk.red figures.cross
]

log = (message, iLevel = 0) ->
  mark = chalk.grey (do moment).format "hh:mm:ss"
  if iLevel in [LOG_NORMAL, LOG_OK, LOG_INFO]
    write  "[#{mark}] #{LOG_LABELS[[iLevel]]} #{message}"
  else
    writeErr "[#{mark}] #{LOG_LABELS[[iLevel]]} #{message}"

normal = (message) -> log message, LOG_NORMAL

ok = (message) -> log message, LOG_OK

info = (message) -> log message, LOG_INFO

warn = (message) -> log message, LOG_WARN

err = (message) -> log message, LOG_ERR

module.exports = log
module.exports.log = log
module.exports.normal = normal
module.exports.ok = ok
module.exports.info = info
module.exports.warn = warn
module.exports.err = err
