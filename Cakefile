###
# Cakefile template
#
# @author Nick K.
# @license MIT
###

exec = require('child_process').execSync
fs = require 'fs'
path = require 'path'

COLOR_DEF = "\x1b[0m"
COLOR_BOLD = '\x1B[0;1m'
COLOR_RED = '\x1B[0;31m'
COLOR_GREEN = '\x1B[0;32m'
COLOR_RESET = '\x1B[0m'
COLOR_YELLOW = '\x1b[33;01m'
COLOR_BLUE = '\x1b[34;01m'
COLOR_CYAN = '\x1b[36;01m'

LOG_NORMAL = 0
LOG_OK = 1
LOG_INFO = 2
LOG_WARN = 3
LOG_ERR = 4

LOG_MESSAGES = [
  "[#{COLOR_DEF}cake#{COLOR_DEF}]"
  "[#{COLOR_GREEN}ok#{COLOR_DEF}]"
  "[#{COLOR_CYAN}info#{COLOR_DEF}]"
  "[#{COLOR_YELLOW}warn#{COLOR_DEF}]"
  "[#{COLOR_RED}err#{COLOR_DEF}]"
]

ICED_EXTNAME = [
  '.coffee'
  '.litcoffee'
  '.coffee.md'
]

write = (string) -> process.stdout.write string

writeErr = (string) -> process.stderr.write string

log = (sMessage, iLevel = 0) ->
  if iLevel in [LOG_NORMAL, LOG_OK, LOG_INFO]
    write LOG_MESSAGES[iLevel] + " #{sMessage}"
  else
    writeErr LOG_MESSAGES[iLevel] + " #{sMessage}"

logLine = (sMessage, iLevel) -> log "#{sMessage}\n", iLevel

clean = (filename) ->
  extname = path.extname filename
  if extname in ICED_EXTNAME
    filename = path.dirname(filename) + '/' +
    path.basename(filename, extname) + '.js'

  unless (fs.statSync filename).isDirectory()
    logLine "Removing #{filename}", LOG_INFO
    fs.unlinkSync filename
    return

  files = fs.readdirSync filename
  if files.length is 0
    logLine "Removing a directory #{filename}", LOG_INFO
    fs.rmdirSync filename
    return

  for file in files
    clean "#{filename}/#{file}"
  logLine "Removing a directory #{filename}", LOG_INFO
  clean filename
  return

watcher = (e, file) ->
  try
    if fs.statSync("./src/#{file}").isDirectory()
      logLine "Creating a directory ./#{file}", LOG_INFO
      fs.mkdirSync "./#{file}"
      return

    build "./src/#{file}"
  catch err
    if err.errno is -2
      clean "./#{file}"
      return

    if err.errno is -17
      logLine "./#{file} is exists in project.", LOG_WARN
      return

    logLine "An error occurred.", LOG_ERR
    logLine "#{err.message}", LOG_ERR
    logLine "Error code: #{err.errno}", LOG_ERR
    logLine 'Watching for changes...', LOG_ERR

getPaths = (sPath) ->
  aPaths =
    dirs: []
    files: []
  buildPaths = (sPath) ->
    aDirs = fs.readdirSync sPath
    for file in aDirs
      if /^(\.[a-zA-Zа-яА-Я0-9-_]+)+/.test file
        continue
      if (fs.statSync "#{sPath}/#{file}").isDirectory()
        aPaths.dirs.push "#{sPath}/#{file}".replace 'src/', ''
        buildPaths "#{sPath}/#{file}"
        continue
      aPaths.files.push "#{sPath}/#{file}"
      continue
  buildPaths sPath
  return aPaths

# Compile file
compile = (file, output) ->
  exec "coffee -b --no-header -c -o #{output} #{file}",
    encoding: 'utf-8'

# Build files
build = (files) ->
  unless Array.isArray files
    output = (files.replace /\/[A-Za-z-_\.]+$/, '').replace '/src', ''
    unless path.extname(files) in ICED_EXTNAME
      if (fs.statSync files).isDirectory()
        return
      logLine "Copy #{files} -> #{output}", LOG_INFO
      fs.createReadStream files
        .pipe fs.createWriteStream(files.replace '/src', '')
      logLine "Watching for changes...", LOG_OK
      return
    logLine "Compile #{files} -> #{output}", LOG_INFO
    try
      compile files, output
    catch err
      logLine "Compilation error. Watching for changes.", LOG_ERR
      return
    logLine 'Watching for changes...', LOG_OK
    return

  for file in files
    output = (file.replace /\/[A-Za-z-_\.]+$/, '').replace '/src', ''
    unless path.extname(file) in ICED_EXTNAME
      logLine "Copy #{file} -> #{output}", LOG_INFO
      fs.createReadStream file
        .pipe fs.createWriteStream(file.replace '/src', '')
      continue
    logLine "Compile #{file} -> #{output}", LOG_INFO
    compile file, output
  logLine 'Done without errors.', LOG_OK

# TASKS

# Build project
task 'build', 'Build Eri from source', ->
  try
    aPaths = getPaths "./src"
    logLine 'Compiling source files...', LOG_NORMAL
    build aPaths.files
  catch e
    logLine 'Error while compilation.', LOG_ERR
    process.exit 0

# Start watching
task 'devel', 'Devel task', ->
  logLine "Starting watcher."
  logLine "Press Control+C to stop the watcher."
  fs.watch './src', recursive: yes, watcher

process.on 'SIGINT', -> process.exit 0
