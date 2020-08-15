import {DataTypes as t} from "sequelize"

import mime from "mime-types"

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
  path: {
    type: t.STRING,
    allowNull: false
  },
  basename: {
    type: t.STRING,
    allowNull: false
  },
  hash: {
    type: t.CHAR(128),
    allowNull: false,
  },
  mime: {
    type: t.STRING,
    allowNull: false,
    validate: {
      idMime(value) {
        if (!(value in mime.extensions)) {
          throw new Error("Invalid mime type.")
        }
      }
    }
  },
  size: {
    type: t.INTEGER,
    allowNull: false,
    comment: "File size in bytes",
  }
}

export default schema
