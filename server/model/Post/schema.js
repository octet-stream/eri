import {DataTypes as t} from "sequelize"

import format from "date-fns/format"

import createSlug from "server/lib/helper/util/createSlug"

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
  userId: {
    type: t.INTEGER.UNSIGNED,
    allowNull: false
  },
  title: {
    type: t.STRING,
    allowNull: false,

    /**
     * @param {string} value
     */
    set(value) {
      this.setDataValue("title", value)
      this.setDataValue(
        "slug",

        `${format(Date.now(), "yyyy-MM-dd")}/${createSlug(value)}`
      )
    }
  },
  slug: {
    type: t.STRING,
    allowNull: false,
    unique: true
  },
  text: {
    type: t.TEXT({length: "medium"}),
    allowNull: false
  },
  isDraft: {
    type: t.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}

export default schema
