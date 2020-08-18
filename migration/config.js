const loadConfig = require("./helper/loadConfig")

const base = ".env"
const names = ["production", "development", "test"]

const defaultConfig = {
  ...loadConfig(base), ...loadConfig(`${base}.local`)
}

const configs = {}
for (const name of names) {
  const {
    DB_HOST: host = null,
    DB_PORT: port = null,
    DB_USER: username = null,
    DB_PASSWORD: password = null,
    DB_NAME: database = null,
    DB_DIALECT: dialect = null
  } = {
    ...defaultConfig,
    ...loadConfig(`${base}.${name}`),
    ...loadConfig(`${base}.${name}.local`)
  }

  configs[name] = {
    host,
    port,
    username,
    password,
    database,
    dialect
  }
}

module.exports = configs
