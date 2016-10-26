module.exports = (types) ->
  tagId:
    type: types.INTEGER
    primaryKey: yes
    autoIncrement: on
    allowNull: no
  name:
    type: types.STRING
    allowNull: no
    unique: yes
