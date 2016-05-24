'use strict'

model = require '../core/database'
bcrypt = require '../core/helpers/co-bcrypt'

user = model 'user',
  require '../core/database/schemas/user'

class User

module.exports = User
