const {DataTypes: t} = require("sequelize")

const snake = require("snakecase-keys")

module.exports = {
  /**
   * @param {import("sequelize").QueryInterface} q
   */
  up: q => q.sequelize.transaction(async transaction => {
    await q.createTable(
      "users",

      snake(
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
          firstName: {
            type: t.STRING,
            allowNull: true
          },
          lastName: {
            type: t.STRING,
            allowNull: true
          }
        },

        {
          deep: false
        }
      ),

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
