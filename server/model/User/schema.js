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
  fileId: {
    type: t.INTEGER.UNSIGNED,
    allowNull: true
  },
  email: {
    type: t.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: t.STRING,
    allowNull: false
  },
  login: {
    type: t.STRING,
    allowNull: false,
    validate: {
      isAlphanumeric: true
    }
  },
  firstName: {
    type: t.STRING,
    allowNull: true
  },
  lastName: {
    type: t.STRING,
    allowNull: true
  }
}

export default schema
