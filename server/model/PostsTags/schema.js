import {DataTypes as t} from "sequelize"

/**
 * @const schema
 *
 * @type {import("sequelize").ModelAttributes}
 */
const schema = {
  postId: {
    type: t.INTEGER.UNSIGNED
  },
  tagId: {
    type: t.INTEGER.UNSIGNED
  }
}

export default schema
