"use strict"

snakecase = require "snake-case"
{database, IS_DEVEL} = require "../helper/configure"
{info} = require "../logger"

Sequelize = require "sequelize"
sequelize = new Sequelize database.name, database.user, database.pass,
  dialect: database.driver
  host: database.host
  port: database.port
  logging: if IS_DEVEL then info else off

types =
  STRING: Sequelize.STRING
  CHAR: Sequelize.CHAR
  TEXT: Sequelize.TEXT
  INTEGER: Sequelize.INTEGER
  BIGINT: Sequelize.BIGINT
  FLOAT: Sequelize.FLOAT
  REAL: Sequelize.REAL
  DOUBLE: Sequelize.DOUBLE
  DECIMAL: Sequelize.DECIMAL
  BOOLEAN: Sequelize.BOOLEAN
  TIME: Sequelize.TIME
  DATE: Sequelize.DATE
  DATEONLY: Sequelize.DATEONLY
  HSTORE: Sequelize.HSTORE
  JSON: Sequelize.JSON
  JSONB: Sequelize.JSONB
  NOW: Sequelize.NOW
  BLOB: Sequelize.BLOB
  RANGE: Sequelize.RANGE
  UUID: Sequelize.UUID
  UUIDV1: Sequelize.UUIDV1
  UUIDV2: Sequelize.UUIDV2
  VIRTUAL: Sequelize.VIRTUAL
  ENUM: Sequelize.ENUM
  ARRAY: Sequelize.ARRAY
  GEOMETRY: Sequelize.GEOMETRY
  GEOGRAPHY: Sequelize.GEOGRAPHY

main = (name, schema, options = {}) ->
  options.timestamps or= off
  options.underscored = yes

  return sequelize.define snakecase("#{name}"),
    schema(types),
    options

module.exports = main
