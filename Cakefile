###
# Cakefile template
#
# @author Nick K.
# @license MIT
###
vfs = require "vinyl-fs"
ora = do require "ora"
glob = require "glob"
pify = require "pify"
coffee = require "coffee-script"
rimraf = require "rimraf"
through = require "through2"
sourcemaps = require "gulp-sourcemaps"
applySourceMap = require "vinyl-sourcemaps-apply"
{dirname, extname} = require "path"
{red, yellow, green, cyan} = require "chalk"
{cross, tick, pointer, warning, info} = require "figures"
{realpathSync, statSync, mkdirSync, watch} = require "fs"

LOG_NORMAL = 0
LOG_OK = 1
LOG_INFO = 2
LOG_WARN = 3
LOG_ERR = 4

LOG_MESSAGES = [
  pointer
  green tick
  cyan info
  yellow warning
  red cross
]

# Src dirname
SRC_DIR = realpathSync "#{__dirname}/src"

# Is devel task has been started?
isDevel = no

# Promisify glob using pify
glob = pify glob
rimraf = pify rimraf

###
# @param string
###
write = (string) -> process.stdout.write string

###
# @param string
###
writeErr = (string) -> process.stderr.write string

###
# @param string
# @param int level
###
log = (string, level = 0) ->
  if level in [LOG_NORMAL, LOG_OK, LOG_INFO]
    write "#{LOG_MESSAGES[level]} #{string}\n"
  else
    writeErr "#{LOG_MESSAGES[level]} #{string}\n"

###
# Handler for errors and SIGINT event
#
# @params Error err
###
onProcessExitOrError = (err) ->
  if err?
    log "Compilation error:", LOG_ERR
    console.error err.stack
    log "Watching for changes...", LOG_ERR if isDevel
    process.exit 1 unless isDevel
    return
  
  if isDevel
    write "\n"
    log "Done.", LOG_OK
  else
    ora.text = "Done without errors."
    do ora.succeed

  process.exit 0

###
# Replace .coffee extname to .js
#
# @param string filename
# @return string
###
replaceExtname = (filename) -> filename.replace /\.(coffee)$/, ".js"

###
# Get destination path
#
# @param string filename
# @return string
###
getDestFilename = (filename) -> replaceExtname filename.replace "src/", ""

###
# Transform source file using modified CoffeeScript compiler
#
# @param File file
# @param string enc
# @param function cb
###
transform = (file, enc, cb) ->
  if isDevel
    log "Compile: #{file.path}"
  else
    ora.text = "Compile: #{file.path}"

  try
    contents = coffee.compile "#{file.contents}",
      bare: on
      header: off
      sourceMap: !!isDevel
      sourceRoot: no
      filename: file.path
      sourceFiles: [file.relative]
      generatedFile: replaceExtname file.relative

    if contents and contents.v3SourceMap and isDevel
      applySourceMap file, contents.v3SourceMap
      file.contents = new Buffer contents.js
    else
      file.contents = new Buffer contents

    file.path = replaceExtname file.path

    cb null, file
  catch err
    return cb err

###
# Compile files using streams
#
# @param array files
###
make = (files) ->
  vfs.src files
    .on "error", onProcessExitOrError
    .pipe do sourcemaps.init
    .pipe through objectMode: on, transform
    .on "error", onProcessExitOrError
    .pipe do sourcemaps.write
    .pipe vfs.dest (filename) -> dirname getDestFilename filename.path
    .on "error", onProcessExitOrError
    .on "end",
      if isDevel
        -> log "Watching for changes...", LOG_INFO
      else
        onProcessExitOrError

###
# Watch for the changes in SRC_DIR
#
# @param Event e
# @param string filename
###
watcher = (e, filename) ->
  filename = "#{SRC_DIR}/#{filename}"
  try
    stat = statSync filename

    return mkdirSync getDestFilename filename if do stat.isDirectory

    __ext = extname filename
    return make [filename] if __ext in [".coffee", ".litcoffee", ".coffee.md"]
  catch err
    unless err? and err.code is "ENOENT"
      return process.emit "error", err

    onFulfilled = -> log "Remove #{filename}"

    return rimraf getDestFilename filename
      .then onFulfilled, onProcessExitOrError

task "make", "Build app from the source", ->
  do ora.start

  glob "#{SRC_DIR}/**/*.coffee"
    .then make, onProcessExitOrError

task "watch", "Run Cakefile with watcher", ->
  isDevel = yes
  log "Starting watcher..."
  log "Press Control+C to exit.", LOG_INFO
  watch SRC_DIR, recursive: yes, watcher

process.on "error", onProcessExitOrError
process.on "SIGINT", onProcessExitOrError
