import {DataTypes as t} from "sequelize"

/**
 * @const schema
 *
 * @type {import("sequelize").ModelAttributes}
 */
const schema = {
  postId: {
    type: t.INTEGER.UNSIGNED,
    primaryKey: true
  },
  tagId: {
    type: t.INTEGER.UNSIGNED,
    primaryKey: true
  }
}

export default schema
