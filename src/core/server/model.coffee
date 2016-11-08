"use strict"

{assign, defineProperty} = Object

snakecase = require "snake-case"
requireHelper = require "../helper/require"
schemas = requireHelper "../database/schema"

{database, IS_DEVEL} = require "../helper/configure"
{info, warn} = require "../logger"

Sequelize = require "sequelize"
sequelize = new Sequelize database.name, database.user, database.pass,
  dialect: database.driver
  host: database.host
  port: database.port
  logging: if IS_DEVEL then info else off

typesArray = [
  "STRING", "CHAR", "TEXT"
  "INTEGER", "BIGINT", "FLOAT", "REAL", "DOUBLE", "DECIMAL"
  "BOOLEAN", "TIME", "DATE", "DATEONLY"
  "HSTORE", "JSON", "JSONB", "NOW", "BLOB", "RANGE"
  "UUID", "UUIDV1", "UUIDV2"
  "VIRTUAL", "ENUM", "ARRAY", "GEOMETRY", "GEOGRAPHY"
]

types = do ->
  res = {}
  res[__type] = Sequelize[__type] for __type in typesArray
  return res

###
# Manually model definition
#
# @param string name
# @param function schema
#
# @return object
###
define = (name, schema, opts = {}) ->
  opts = assign {}, opts, timestamps: off, underscored: yes

  return sequelize.define snakecase("#{name}"),
    schema(types), opts

###
# Define and return all models from core/database/schema
#
# @return object
###
model = ->
  res = {}

  for own __name, __sch of schemas
    unless typeof __sch is "function"
      warn "Schema must return a function in \"#{__name}\""
      continue

    res[__name] = define __name, __sch unless __name of res

  return res

module.exports = do model
defineProperty module.exports, "define", enumerable: no, value: define
