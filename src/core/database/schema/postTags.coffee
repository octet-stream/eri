module.exports = (types) ->
  id:
    type: types.INTEGER
    primaryKey: on
    autoIncrement: on
    allowNull: no
  tagId:
    type: types.INTEGER
    allowNull: no
    field: "tag_id"
  postId:
    type: types.INTEGER
    allowNull: no
    field: "post_id"
