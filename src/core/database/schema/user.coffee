"use strict"

module.exports = (types) ->
  userId:
    type: types.INTEGER
    primaryKey: yes
    allowNull: no
    autoIncrement: on
    field: "user_id"
  login:
    type: types.STRING 35
    unique: yes
    allowNull: no
  email:
    type: types.STRING
    unique: yes
    allowNull: no
  password:
    type: types.STRING
    allowNull: no
  firstname:
    type: types.STRING 36
    allowNull: yes
  lastname:
    type: types.STRING 40
    allowNull: yes
  bio:
    type: types.TEXT
    allowNull: yes
  registeredAt:
    type: types.DATE
    allowNull: no
    defaultValue: types.NOW
    field: "registered_at"
  role:
    type: types.INTEGER 1
    allowNull: no
    defaultValue: 0 # User by default
  status:
    type: types.INTEGER 1
    allowNull: no
    defaultValue: 0 # Inactive by default
