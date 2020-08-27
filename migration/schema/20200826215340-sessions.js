const {DataTypes: t} = require("sequelize")

const tableName = "sessions"
const userFkName = "session_user_fk"

module.exports = {
  /**
   * @param {import("sequelize").QueryInterface} q
   */
  up: q => q.sequelize.transaction(async transaction => {
    await q.createTable(
      tableName,

      {
        id: {
          type: t.STRING(21),
          primaryKey: true
        },
        user_id: {
          type: t.INTEGER.UNSIGNED,
          allowNull: true,
          comment: "An ID of a user associated with the session"
        },
        cookie: {
          type: t.JSON,
          allowNull: false
        },
        client_browser_name: {
          type: t.STRING,
          allowNull: false,
        },
        client_browser_version: {
          type: t.STRING,
          allowNull: false,
        },
        client_os_name: {
          type: t.STRING,
          allowNull: false,
        },
        client_os_version: {
          type: t.STRING,
          allowNull: false,
        },
        client_ip: {
          type: t.STRING,
          allowNull: false,
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
        expires_at: {
          type: t.DATE,
          allowNull: true,
          defaultValue: null
        }
      },

      {
        transaction
      }
    )

    await q.addConstraint(
      tableName,

      {
        transaction,
        name: userFkName,
        type: "foreign key",
        fields: ["user_id"],
        references: {
          table: "users",
          field: "id"
        }
      }
    )
  }),

  /**
   * @param {import("sequelize").QueryInterface} q
   */
  down: q => q.sequelize.transaction(async transaction => {
    await q.removeConstraint(tableName, userFkName, {transaction})
    await q.dropTable(tableName, {transaction})
  })
}
