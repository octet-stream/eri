const {DataTypes: t} = require("sequelize")

const tableName = "users"
const constraintName = "user_avatar_fk"

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
        file_id: {
          type: t.INTEGER.UNSIGNED,
          allowNull: true
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

    await q.addConstraint(
      tableName,

      {
        transaction,
        name: constraintName,
        type: "foreign key",
        fields: ["file_id"],
        references: {
          table: "files",
          field: "id"
        }
      }
    )
  }),

  /**
   * @param {import("sequelize").QueryInterface} q
   */
  down: q => q.sequelize.transaction(async transaction => {
    await q.removeConstraint(tableName, constraintName, {transaction})
    await q.dropTable(tableName, {transaction})
  })
}
