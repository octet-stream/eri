import {createHash, HashOptions} from "crypto"
import {createReadStream} from "fs"

/**
 * Generate cache from a file's content
 *
 * @param path
 * @param algorithm
 * @param options
 */
async function calcFileHash(
  path: string,
  algorithm: string,
  options?: HashOptions
): Promise<string> {
  const hash = createHash(algorithm, options)
  const stream = createReadStream(path)

  for await (const chunk of stream) {
    hash.update(chunk)
  }

  return hash.digest("hex")
}

export default calcFileHash
