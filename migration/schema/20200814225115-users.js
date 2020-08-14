const {DataTypes: t} = require("sequelize")

module.exports = {
  /**
   * @param {import("sequelize").QueryInterface} q
   */
  up: q => q.sequelize.transaction(async transaction => {
    await q.createTable(
      "users",

      {
        id: {
          type: t.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true
        },
        email: {
          type: t.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: t.STRING,
          allowNull: false
        },
        login: {
          type: t.STRING,
          allowNull: false
        },
        first_name: {
          type: t.STRING,
          allowNull: true
        },
        last_name: {
          type: t.STRING,
          allowNull: true
        }
      },

      {
        transaction
      }
    )
  }),

  /**
   * @param {import("sequelize").QueryInterface} q
   */
  down: q => q.sequelize.transaction(async transaction => {
    await q.dropTable("users", {transaction})
  })
}
