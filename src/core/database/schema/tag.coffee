module.exports = (types) ->
  tagId:
    type: types.INTEGER
    primaryKey: yes
    autoIncrement: on
    allowNull: no
    field: "tag_id"
  name:
    type: types.STRING
    allowNull: no
    unique: yes
