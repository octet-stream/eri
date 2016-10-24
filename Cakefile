###
# Cakefile template
#
# @author Nick K.
# @license MIT
###
vfs = require "vinyl-fs"
glob = require "glob"
pify = require "pify"
coffee = require "coffee-script"
rimraf = require "rimraf"
through = require "through2"
{dirname} = path = require "path"
{realpathSync, statSync, mkdirSync, watch} = require "fs"

COLOR_DEF = "\x1b[0m"
COLOR_BOLD = "\x1B[0;1m"
COLOR_RED = "\x1B[0;31m"
COLOR_GREEN = "\x1B[0;32m"
COLOR_RESET = "\x1B[0m"
COLOR_YELLOW = "\x1b[33;01m"
COLOR_BLUE = "\x1b[34;01m"
COLOR_CYAN = "\x1b[36;01m"

LOG_NORMAL = 0
LOG_OK = 1
LOG_INFO = 2
LOG_WARN = 3
LOG_ERR = 4

LOG_MESSAGES = [
  "#{COLOR_DEF}cake#{COLOR_DEF}"
  "#{COLOR_GREEN}ok#{COLOR_DEF}"
  "#{COLOR_CYAN}info#{COLOR_DEF}"
  "#{COLOR_YELLOW}warn#{COLOR_DEF}"
  "#{COLOR_RED}err#{COLOR_DEF}"
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
    write "[#{LOG_MESSAGES[level]}] #{string}\n"
  else
    writeErr "[#{LOG_MESSAGES[level]}] #{string}\n"

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
  else
    log "Done without errors.", LOG_OK
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
  log "Compile #{file.path}", LOG_INFO

  try
    contents = coffee.compile "#{file.contents}",
      bare: on
      header: off
      filename: file.path
      sourceRoot: no
      sourceFiles: [file.relative]
      generatedFile: replaceExtname file.relative

    file.contents = Buffer contents
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
    .pipe through objectMode: on, transform
    .on "error", onProcessExitOrError
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
  glob "#{SRC_DIR}/**/*.coffee"
    .then make, onProcessExitOrError

task "watch", "Run Cakefile with watcher", ->
  isDevel = yes
  log "Starting watcher..."
  log "Press Control+C to exit.", LOG_INFO
  watch SRC_DIR, recursive: yes, watcher

process.on "error", onProcessExitOrError
process.on "SIGINT", onProcessExitOrError
