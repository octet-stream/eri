const {DataTypes: t} = require("sequelize")

const tableName = "files"

module.exports = {
  /**
   * @param {import("sequelize").QueryInterface} q
   */
  up: q => q.sequelize.transaction(async transaction => {
    await q.createTable(
      tableName,

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
          allowNull: true,
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
    await q.dropTable(tableName, {transaction})
  })
}
