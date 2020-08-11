import {createReadStream} from "fs"
import {createHash} from "crypto"

/**
 * Generate cache from a file's content
 *
 * @param {string} filename
 * @param {string} algorithm
 * @param {import("crypto").HashOptions} [options = {}]
 *
 * @return {string}
 */
async function calcFileHash(filename, algorithm, options = {}) {
  const hash = createHash(algorithm, options)
  const stream = createReadStream(filename)

  for await (const chunk of stream) {
    hash.update(chunk)
  }

  return hash.digest("hex")
}

export default calcFileHash
