const {DataTypes: t} = require("sequelize")

const tableName = "posts_tags"
const postFkName = "post_fk_to_post"
const tagFkName = "tag_fk_to_tag"

module.exports = {
  /**
   * @param {import("sequelize").QueryInterface} q
   */
  up: q => q.sequelize.transaction(async transaction => {
    await q.createTable(
      tableName,

      {
        post_id: {
          type: t.INTEGER.UNSIGNED,
          allowNull: false
        },
        tag_id: {
          type: t.INTEGER.UNSIGNED,
          allowNull: false
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
        name: postFkName,
        type: "foreign key",
        fields: ["post_id"],
        references: {
          table: "posts",
          field: "id"
        }
      }
    )

    await q.addConstraint(
      tableName,

      {
        transaction,
        name: tagFkName,
        type: "foreign key",
        fields: ["tag_id"],
        references: {
          table: "tags",
          field: "id"
        }
      }
    )
  }),

  /**
   * @param {import("sequelize").QueryInterface} q
   */
  down: q => q.sequelize.transaction(async transaction => {
    await q.removeConstraint(tableName, tagFkName, {transaction})
    await q.removeConstraint(tableName, postFkName, {transaction})
    await q.dropTable(tableName, {transaction})
  })
}
