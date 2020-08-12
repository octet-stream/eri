import {join} from "path"

import {Model} from "sequelize"
import {nanoid} from "nanoid/async"
import {outputFile, readFile, unlink, stat} from "fs-extra"

import format from "date-fns/format"

import calcFileHash from "lib/helper/util/calcFileHash"
import waterfall from "lib/helper/array/runWaterfall"
import readOnly from "lib/helper/decorator/readOnly"
import createModel from "lib/db/createModel"

import schema from "./schema"

const mask = "yyyy-MM-dd"

const getSize = path => stat(path).then(({size}) => size)

const getPath = (dest, ext) => nanoid().then(prefix => join(
  dest, `${prefix}-${format(Date.now(), mask)}${ext}`
))

/**
 * @typedef {import("sequelize").CreateOptions} CreateOptions
 */

/**
 * @typedef {import("sequelize").UpdateOptions} UpdateOptions
 */

/**
 * @typedef {import("sequelize").DestroyOptions} DestroyOptions
 */

/**
 * @typedef {import("sequelize").BulkCreateOptions} BulkCreateOptions
 */

/**
 * @typedef {Object} FileInput
 *
 * @property {string} path
 * @property {string} mime
 * @property {string} hash
 * @property {number} size
 */

@createModel(schema, {paranoid: true})
class File extends Model {
  /**
   * @public
   * @static
   * @property
   *
   * @type {string}
   */
  @readOnly static root = join(__dirname, "..", "..", "static");

  /**
   * @param {Object} params
   * @param {string} params.dest File destination directory
   * @param {FileInput} params.file
   * @param {CreateOptions} [options = {}]
   */
  static async create({dest, file}, options = {}) {
    // Get relative dest path
    const path = await getPath(dest, file.extname)

    // Get full dest path
    const absolute = join(File.root, path)

    // Get a size of a file
    const size = await getSize(file.path)

    await readFile(file.path).then(content => outputFile(absolute, content))

    const hash = await calcFileHash(absolute, "sha512")

    return super.create({...file, path, hash, size}, options)
  }

  /**
   * @param {Object} params
   * @param {string} params.dest
   * @param {FileInput[]} params.files
   * @param {BulkCreateOptions} [options]
   */
  static async bulkCreate({files, dest}, options) {
    if (files.length <= 1) {
      return this.create({file: files[0], dest}, options).then(Array.of)
    }

    // Get relative dest paths
    files = await Promise.all(files.map(
      file => getPath(dest, file.extname).then(path => ({...file, dest: path}))
    ))

    // Get absolute dest paths
    files = files.map(file => ({...file, absolute: join(File.root, file.dest)}))

    // Get a size of each file
    files = await Promise.all(files.map(
      file => getSize(file.path).then(size => ({...file, size}))
    ))

    // Save files (serially)
    for (const {path, absolute} of files) {
      const content = await readFile(path)

      await outputFile(absolute, content)
    }

    // Calculative a hash of each file's content
    files = await Promise.all(files.map(
      file => calcFileHash(file.absolute, "sha512")
        .then(hash => ({...file, hash}))
    ))

    return super.bulkCreate(
      files.map(file => ({...file, path: file.dest})),

      options
    )
  }

  /**
   * @param {Object} params
   * @param {string} params.dest File destination directory
   * @param {FileInput} params.file
   * @param {UpdateOptions} [options = {}]
   */
  async updateContent({dest, file}, options = {}) {
    // Get relative dest path
    const path = await getPath(dest, file.extname)

    // Get full dest path
    const absolute = join(File.root, path)

    // Get a size of a file
    const size = await getSize(file.path)

    return waterfall([
      () => readFile(file.path),

      content => outputFile(absolute, content),

      () => unlink(join(File.root, this.path)),

      () => calcFileHash(absolute, "sha512"),

      hash => super.update({...file, path, hash, size}, options),
    ])
  }

  /**
   * @param {DestroyOptions} [options = {}]
   */
  async destroy(options = {}) {
    await super.destroy(options)

    if (options.force) {
      await unlink(join(File.root, this.path))
    }
  }
}

export default File
