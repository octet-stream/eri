module.exports = (types) ->
  postId:
    type: types.INTEGER
    primaryKey: yes
    autoIncrement: on
    allowNull: no
    field: "post_id"
  userId:
    type: types.INTEGER
    allowNull: no
    field: "user_id"
  title:
    type: types.STRING
    allowNull: no
  markdown:
    type: types.TEXT "medium"
    allowNull: no
  html:
    type: types.TEXT "medium"
    allowNull: no
