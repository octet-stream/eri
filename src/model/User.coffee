'use strict'

model = require '../core/database'
bcrypt = require '../core/helpers/co-bcrypt'
co = require 'co'

user = model 'user',
  require '../core/database/schemas/user'

class User
  getAuthenticated: (id, cb) =>
    user.findOne
      attributes: [
        'userId'
        'username'
        'role'
        'status'
      ]
      where:
        userId: id
    .asCallback cb

  ###
  # Auth user by his username + password pair
  #
  # @param string sUsername
  # @param string sPass
  #
  # Notice: "=>" because this function used for passport.js in LocalStrategy.
  ###
  auth: (sUsername, sPass, cb) =>
    user.findOne
      attributes: [
        'userId'
        'password'
      ]
      where:
        username: sUsername
    .then (oUserData) ->
      {password, userId} = oUserData.get plain: yes
      co ->
        try
          unless yield bcrypt.compare sPass, password
            return cb null, no

          # Promise.resolve userId
          cb null, userId
        catch err
          Promise.reject err
    .catch (err) -> cb err

module.exports = User
