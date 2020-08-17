import {hash, compare} from "bcrypt"
import {Model} from "sequelize"

import createModel from "server/lib/db/createModel"

import schema from "./schema"

/**
 * @typedef {import("sequelize").CreateOptions} CreateOptions
 */

@createModel(schema, {paranoid: true})
class User extends Model {
  /**
   * @param {Object.<string, any>} user
   * @param {CreateOptions} [options]
   */
  static async create(user, options) {
    user.password = await hash(user.password, 15)

    return super.create(user, options)
  }

  comparePassword = password => compare(password, this.password)
}

export default User
