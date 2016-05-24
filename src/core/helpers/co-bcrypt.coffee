thunk = require 'thunkify'
bcrypt = require 'bcryptjs'

aMethods = [
  'genSalt'
  'hash'
  'compare'
]

# Wrap async methods
aMethods.forEach (sMethod) ->
  unless bcrypt[sMethod]
    return
  exports[sMethod] = thunk bcrypt[sMethod]
