db = require "../core/database"
user = db "user", require "../core/database/schema/user"

{isEmail} = require "../core/helper/validation"
{compare} = require "../core/helper/bcrypt"

_authenticate = (username, pass) ->
  opts =
    raw: yes
    attributes: ["userId", "password"]
    where: if isEmail username then email: username else login: username

  userData = await user.findOne opts

  return null unless userData?
  return null unless compare userData.password, pass
  return userData.userId

getAuthenticated = (userId, cb) ->
  opts =
    raw: yes
    attributes: ["userId", "login", "role", "status"]
    where: {userId}

  user.findOne opts
    .asCallback cb

  return

signin = (username, pass, cb) ->
  _authenticate username, pass
    .then (userId) -> if userId? then cb null, userId else cb null, no
    .catch (err) -> cb err

module.exports = {
  getAuthenticated
  signin
}
