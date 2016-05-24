'use strict'

{database} = require '../helpers/configure-helper'

Sequelize = require 'sequelize'
sequelize = new Sequelize database.name, database.user, database.pass,
  dialect: database.driver
  host: database.host
  port: database.port

oTypes =
  STRING: Sequelize.STRING
  CHAR: Sequelize.CHAR
  TEXT: Sequelize.TEXT
  INTEGER: Sequelize.INTEGER
  BIGINT: Sequelize.BIGINT
  FLOAT: Sequelize.FLOAT
  REAL: Sequelize.REAL
  DOUBLE: Sequelize.DOUBLE
  DECIMAL: Sequelize.DECIMAL
  BOOLEAN: Sequelize.BOOLEAN # implemented as tinyint (mysql)? Huh? o_O
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

init = (sName, schema, oOptions = {}) ->
  oOptions.timestamps or= off

  return sequelize.define "#{database.prefix}#{sName}",
    schema(oTypes),
    oOptions

module.exports = init
