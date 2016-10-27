pify = require "pify"
bcrypt = require "bcryptjs"

methods = [
  "genSalt"
  "hash"
  "compare"
]

# Wrapper
wrapMethod = (method) ->
  unless bcrypt[method]
    return
  exports[method] = pify bcrypt[method]

# Wrap async methods
methods.forEach wrapMethod
