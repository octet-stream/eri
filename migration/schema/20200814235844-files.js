const {DataTypes: t} = require("sequelize")

const snake = require("snakecase-keys")

const tableName = "files"

module.exports = {
  /**
   * @param {import("sequelize").QueryInterface} q
   */
  up: q => q.sequelize.transaction(async transaction => {
    await q.createTable(
      tableName,

      snake(
        {
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
          },
          size: {
            type: t.INTEGER,
            allowNull: false,
            comment: "File size in bytes",
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
    await q.dropTable(tableName, {transaction})
  })
}
