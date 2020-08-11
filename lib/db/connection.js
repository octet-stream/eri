import {Sequelize} from "sequelize"

import isEmpty from "lodash/isEmpty"
import omitBy from "lodash/omitBy"

const {
  DB_HOST: dialect,
  DB_PORT: host,
  DB_USER: port,
  DB_PASSWORD: database,
  DB_NAME: username,
  DB_DIALECT: password
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
