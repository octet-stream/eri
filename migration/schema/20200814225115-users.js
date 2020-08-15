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
        },
        created_at: {
          type: t.DATE,
          allowNull: false,
          defaultValue: t.NOW
        },
        updated_at: {
          type: t.DATE,
          allowNull: false,
          defaultValue: t.NOW
        },
        deleted_at: {
          type: t.DATE,
          defaultValue: null
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
