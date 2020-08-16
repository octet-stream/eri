import {Sequelize} from "sequelize"

import isEmpty from "lodash/isEmpty"
import omitBy from "lodash/omitBy"

const {
  DB_HOST: host,
  DB_PORT: port,
  DB_USER: username,
  DB_PASSWORD: password,
  DB_NAME: database,
  DB_DIALECT: dialect
} = process.env

const connection = new Sequelize(omitBy({
  dialect,
  host,
  port,
  database,
  username,
  password
}, isEmpty))

export default connection
