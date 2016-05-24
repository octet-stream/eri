'use strict'

module.exports = (oTypes) ->
  userId:
    type: oTypes.INTEGER
    primaryKey: yes
    allowNull: no
    autoIncrement: on
  username:
    type: oTypes.STRING 35
    unique: yes
    allowNull: no
  email:
    type: oTypes.STRING
    unique: yes
    allowNull: no
  firstname:
    type: oTypes.STRING 36
    allowNull: yes
  lastname:
    type: oTypes.STRING 40
    allowNull: yes
  about:
    type: oTypes.TEXT
    allowNull: yes
  registeredAt:
    type: oTypes.DATE
    allowNull: no
    defaultValue: oTypes.NOW
  role:
    type: oTypes.INTEGER 1
    allowNull: no
    defaultValue: 0 # User by default
  status:
    type: oTypes.INTEGER 1
    allowNull: no
    defaultValue: 0 # Inactive by default
