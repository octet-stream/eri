{isEmail} = require "../core/helper/validation"
{compare} = require "../core/helper/bcrypt"
{createClient} = require "then-redis"

{user} = require "../core/server/model"

# TODO: Don't forget to add configs for redis client
redis = do createClient

_authenticate = (username, pass) ->
  opts =
    raw: yes
    attributes: ["userId", "password"]
    where: if isEmail username then email: username else login: username

  userData = await user.findOne opts

  return null unless userData?
  return null unless compare userData.password, pass
  return userData.userId

signin = (username, pass, cb) ->
  _authenticate username, pass
    .then (userId) -> if userId? then cb null, userId else cb null, no
    .catch (err) -> cb err

getAuthenticated = (userId, cb) ->
  opts =
    raw: yes
    attributes: ["userId", "login", "role", "status"]
    where: {userId}

  user.findOne opts
    .asCallback cb

  return

module.exports = {
  getAuthenticated
  signin
}
