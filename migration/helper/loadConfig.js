const {readFileSync} = require("fs")
const {resolve} = require("path")

const dotenv = require("dotenv")
const omit = require("lodash/omit")
const isEmpty = require("lodash/isEmpty")

/**
 * @param {string} name
 *
 * @return {Object.<string, string>}
 */
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

module.exports = loadConfig
