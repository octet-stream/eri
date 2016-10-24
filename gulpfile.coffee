# Common plugins
gulp = require 'gulp'
gutil = require 'gulp-util'
newer = require 'gulp-newer'
plumber = require 'gulp-plumber'
clean = require 'gulp-rimraf'
gulpif = require 'gulp-if'
livereload = require 'gulp-livereload'

# ICS plugins
iced = require 'gulp-iced'
uglify = require 'gulp-uglify'
browserify = require 'browserify'
vinylSource = require 'vinyl-source-stream' # For rename js bundle
vinylBuffer = require 'vinyl-buffer' # For gulp-uglify

# Stylus plugins
stylus = require 'gulp-stylus'
csso = require 'gulp-csso'
autoprefixer = require 'gulp-autoprefixer'
jeet = require 'jeet' # Responsive grid system
rupture = require 'rupture' # Breakpoint system

# Import theme
{app: {theme}} = require './core/helpers/configure-helper'
theme or= 'eri'

# Theme path
THEME_PATH = "#{__dirname}/themes/#{theme}"

# Src dirs
JADE_SRC = "#{THEME_PATH}/views/**/*.jade"
COFFEE_SRC = "#{THEME_PATH}/src/coffee/*.iced"
STYLUS_SRC_DIR = "#{THEME_PATH}/src/stylus"
STYLUS_SRC = [
  "#{STYLUS_SRC_DIR}/common/common.styl"
  "#{STYLUS_SRC_DIR}/error/*.styl"
]

###
# Destination dirs
###
COFFEE_TMP = "#{THEME_PATH}/src/gulp-tmp/"
COFFEE_DEST = "#{THEME_PATH}/public/assets/js"
STYLUS_DEST = "#{THEME_PATH}/public/assets/css"

# Is devel task running?
bIsDevel = no

###
# SIGINT signal listener
# -
# Clean frontend/gulp-runtime before exit if devel task has been running
###
process.on 'SIGINT', -> process.exit 0

###
# Error Handler
# -
# @param Error err
###
errorHandler = (err) ->
  gutil.log do err.toString
  unless bIsDevel
    process.exit 1

###
# Compile stylus
###
gulp.task 'stylus', ->
  gulp.src STYLUS_SRC
    .pipe plumber errorHandler
    .pipe gulpif bIsDevel, newer "#{STYLUS_SRC_DIR}/**/*.styl"
    .pipe stylus use: [
      do jeet
      do rupture
    ]
    .pipe autoprefixer browsers: ['last 4 versions']
    .pipe gulpif not bIsDevel, do csso # Compress CSS only for production
    .pipe gulp.dest STYLUS_DEST
    .pipe gulpif bIsDevel, do livereload

###
# Compile ICS
###
gulp.task 'compile:iced', ->
  gulp.src COFFEE_SRC
    .pipe plumber errorHandler
    .pipe gulpif bIsDevel, newer COFFEE_SRC
    .pipe do iced
    .pipe gulp.dest COFFEE_TMP

###
# Build common.js
###
gulp.task 'iced', ['compile:iced'], ->
  browserify COFFEE_TMP + '/main.js',
    insertGlobals: yes
    debug: bIsDevel
  .bundle()
  .on 'error', errorHandler
  .pipe vinylSource 'common.js'
  .pipe do vinylBuffer
  .pipe gulpif not bIsDevel, do uglify # Optimize JS for production
  .pipe gulp.dest COFFEE_DEST
  .pipe gulpif bIsDevel, do livereload

gulp.task 'refresh', ->
  gulp.src JADE_SRC, read: no
    .pipe do livereload

gulp.task 'devel', ->
  bIsDevel = yes
  do livereload.listen
  gulp.watch "#{STYLUS_SRC_DIR}/**/*.styl", ['stylus']
  gulp.watch COFFEE_SRC, ['iced']
  gulp.watch JADE_SRC, ['refresh']

gulp.task 'build', ['stylus', 'iced']

gulp.task 'default', ['build']
