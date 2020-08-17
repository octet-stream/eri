import {DataTypes as t} from "sequelize"

import createSlug from "lib/helper/util/createSlug"

/**
 * @const schema
 *
 * @type {import("sequelize").ModelAttributes}
 */
const schema = {
  id: {
    type: t.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: t.STRING,
    allowNull: false,

    /**
     * @param {string} value
     */
    set(value) {
      this.setDataValue("name", value)
      this.setDataValue("slug", createSlug(value))
    }
  },
  slug: {
    type: t.STRING,
    allowNull: false,
    unique: true
  }
}

export default schema
