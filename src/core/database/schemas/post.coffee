module.exports = (oTypes) ->
  postId:
    type: oTypes.INTEGER
    primaryKey: yes
    autoIncrement: on
    allowNull: no
  userId:
    type: oTypes.INTEGER
    allowNull: no
  title:
    type: oTypes.STRING
    allowNull: no
  tags:
    type: oTypes.TEXT
    allowNull: no
    get: -> if (sValue = @getDataValue 'tags') then sValue.split ':' else []
    set: (aValues) ->
      @setDataValue 'tags', aValues.join ':' if aValues?
      return
  content:
    type: oTypes.TEXT 'medium'
    allowNull: no
