"use strict"

# Common plugins
gulp = require "gulp"
gutil = require "gulp-util"
watch = require "gulp-watch"
newer = require "gulp-newer"
plumber = require "gulp-plumber"
clean = require "gulp-rimraf"
rimraf = require "rimraf"
livereload = require "gulp-livereload"

# Stylus plugins
stylus = require "gulp-stylus"
csso = require "gulp-csso"
autoprefixer = require "gulp-autoprefixer"

# JS plugins
browserify = require "browserify"
cjsx = require "coffee-reactify"
hmr = require "browserify-hmr"
svg = require "svg-reactify"
rht = require "react-hot-transform"
uglify = require "gulp-uglify"
envify = require "gulp-envify"
source = require "vinyl-source-stream" # For rename js bundle
vinylBuffer = require "vinyl-buffer" # For gulp-uglify

# YAML transformer
yaml = require "yamlify"

# SVG
svgmin = require "gulp-svgmin"

# Grid system
jeet = require "jeet"

# Breakpoint system
rupture = require "rupture"

# Normalize
# console.log normalize = require "normalize.styl"

{app: {theme}} = require "./core/helper/configure"
theme or= "eri"

# Theme path
THEME_PATH = "#{__dirname}/themes/#{theme}"

# Src dirs
JADE_SRC = "#{THEME_PATH}/views/**/*.jade"

COFFEE_SRC_DIR = "#{THEME_PATH}/src/coffee"
COFFEE_SRC = "#{COFFEE_SRC_DIR}/main.coffee"
CJSX_SRC = "#{COFFEE_SRC_DIR}/**/*.cjsx"

SVG_SRC = "#{THEME_PATH}/src/svg/**/*.svg"

STYLUS_SRC_DIR = "#{THEME_PATH}/src/stylus"
STYLUS_SRC = [
  "#{STYLUS_SRC_DIR}/common/common.styl"
  "#{STYLUS_SRC_DIR}/errors/*.styl"
]

###
# Destination dirs
###
COFFEE_TMP = "#{THEME_PATH}/src/gulp-tmp/"
COFFEE_DEST = "#{THEME_PATH}/public/assets/js"
SVG_DEST = "#{THEME_PATH}/public/img"
STYLUS_DEST = "#{THEME_PATH}/public/assets/css"

# Is devel task running?
isDevel = no

###
# Error Handler
# 
# @param Error err
###
errorHandler = (err) ->
  gutil.log err.stack
  unless isDevel
    process.exit 1

gulp.task "env:devel", ->
  do livereload.listen
  isDevel = yes

###
# SIGINT signal listener
# 
# Clean frontend/gulp-runtime before exit if devel task has been running
###
process.on "SIGINT", ->
  if isDevel
    rimraf COFFEE_TMP, ->
      process.exit 0
    return
  process.exit 0

process.on "error", errorHandler

###
# Build Stylus
###
gulp.task "stylus", ->
  rebuildStylus = (vinyl) ->
    gutil.log "Rebuild stylus..."
    gulp.src STYLUS_SRC
      .pipe plumber errorHandler
      .pipe if isDevel then newer STYLUS_DEST else do gutil.noop
      .pipe stylus
        "include css": on
        paths: [
          "#{__dirname}/node_modules/normalize.styl"
          "#{__dirname}/node_modules/codemirror/lib"
          "#{__dirname}/node_modules/highlight.js/styles"
        ]
        use: [
          do jeet
          do rupture
        ]
      .pipe autoprefixer browsers: ["last 4 versions"]
      .pipe if isDevel then do gutil.noop else do csso
      .pipe gulp.dest STYLUS_DEST
      .pipe if isDevel then do livereload else do gutil.noop

  do rebuildStylus
  watch "#{STYLUS_SRC_DIR}/**/*.styl", rebuildStylus if isDevel

###
# Build CoffeeScript with Browserify
###
gulp.task "coffee", ->
  # Set NODE_ENV for react
  process.env.NODE_ENV = if isDevel then "development" else "production"

  bundler = browserify COFFEE_SRC,
    transform: [
      [svg, default: "image"]
      cjsx, yaml, rht
    ]
    extensions: [".cjsx", ".coffee"]
    paths: [
      "#{THEME_PATH}/src/coffee"
      "#{THEME_PATH}/public"
    ]
    insertGlobals: yes
    debug: isDevel
    plugin: if isDevel then [hmr] else []

  rebuildBundle = ->
    gutil.log "Rebuild coffee..."
    bundler
      .bundle()
      .on "error", errorHandler
      .pipe plumber errorHandler
      .pipe source "common.js"
      .pipe do vinylBuffer
      .pipe if isDevel then do gutil.noop else envify NODE_ENV: "production"
      .pipe if isDevel then do gutil.noop else do uglify
      .pipe gulp.dest COFFEE_DEST

  do rebuildBundle # Just rebuild bundle before run watcher
  return watch [
    "#{COFFEE_SRC_DIR}/**/*.coffee"
    "#{CJSX_SRC}"
    ], rebuildBundle if isDevel

###
# Optimizing SVG.
###
gulp.task "svg", ->
  rebuildSvg = ->
    gutil.log "Rebuild svg..."
    gulp.src SVG_SRC
      .pipe plumber errorHandler
      .pipe do svgmin
      .pipe gulp.dest SVG_DEST

  do rebuildSvg
  watch SVG_SRC, rebuildSvg if isDevel

###
# Refreshing page with livereload
# 
# Note: Do not use this task directly.
###
gulp.task "refresh", ->
  refresh ->
    gulp.src "#{THEME_PATH}/views/**/*.jade", read: no
      .pipe newer "#{THEME_PATH}/views/**/*.jade"
      .pipe do livereload

  watch "#{THEME_PATH}/views/**/*.jade", refresh if isDevel

###
# Devel task with gulp-watch and livereload
# 
# Run: gulp devel
###
gulp.task "watch", ["env:devel", "svg", "stylus", "coffee"]

###
# Build frontend app for probuction
#
# Run: gulp or gulp make
###
gulp.task "make", ["svg", "stylus", "coffee"]

###
# Execute task "make"
###
gulp.task "default", ["make"]
