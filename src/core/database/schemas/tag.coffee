module.exports = (oTypes) ->
  tagId:
    type: oTypes.INTEGER
    primaryKey: yes
    autoIncrement: on
    allowNull: no
  name:
    type: oTypes.STRING
    allowNull: no
    unique: yes
