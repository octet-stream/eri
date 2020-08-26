import {DataTypes as t} from "sequelize"

/**
 * @const schema
 *
 * @type {import("sequelize").ModelAttributes}
 */
const schema = {
  id: {
    type: t.STRING(21),
    primaryKey: true
  },
  userId: {
    type: t.INTEGER.UNSIGNED,
    allowNull: true,
    comment: "An ID of a user associated with the session"
  },
  clientBrowserName: {
    type: t.STRING,
    allowNull: false,
  },
  clientBrowserVersion: {
    type: t.STRING,
    allowNull: false,
  },
  clientOsName: {
    type: t.STRING,
    allowNull: false,
  },
  clientOsVersion: {
    type: t.STRING,
    allowNull: false,
  },
  clientIp: {
    type: t.STRING,
    allowNull: false,
  }
}

export default schema
