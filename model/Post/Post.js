import {Model} from "sequelize"

import createModel from "lib/db/createModel"

import schema from "./schema"

/**
 * @typedef {import("sequelize").FindOptions} FindOptions
 */

@createModel(schema, {paranoid: true})
class Post extends Model {
  /**
   * @param {string} slug
   * @param {FindOptions} [options]
   *
   * @return {Promise<Post>}
   */
  static async findBySlug(slug, options = {}) {
    return Post.findOne({...options, where: {slug}})
  }
}

export default Post
