const {DataTypes: t} = require("sequelize")

const snake = require("snakecase-keys")

const tableName = "posts"
const constraintName = "post_creator_fk"

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
          userId: {
            type: t.INTEGER.UNSIGNED,
            allowNull: false
          },
          title: {
            type: t.STRING,
            allowNull: false
          },
          slug: {
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
        },

        {
          deep: false
        }
      ),

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
    await q.removeConstraint(tableName, constraintName, {transaction})
    await q.dropTable(tableName, {transaction})
  })
}
