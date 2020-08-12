import {DataTypes as t} from "sequelize"

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
    allowNull: false
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
