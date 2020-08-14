const {readFileSync} = require("fs")
const {resolve} = require("path")

const dotenv = require("dotenv")
const omit = require("lodash/omitBy")
const isEmpty = require("lodash/isEmpty")

const base = ".env"
const names = ["production", "development", "test"]

function loadConfig(name) {
  const filename = resolve(name)

  try {
    const content = readFileSync(filename, "utf8")

    return omit(dotenv.parse(content), isEmpty)
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error(`Cannot load a config from ${filename}`)
    }
  }
}

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
