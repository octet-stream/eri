const {hash} = require("bcrypt")

const loadConfig = require("../helper/loadConfig")

const tableName = "users"

const {USER_EMAIL, USER_PASSWORD, USER_LOGIN} = {
  ...loadConfig(".env.user"),
  ...loadConfig(".env.user.local")
}

module.exports = {
  /**
   * @param {import("sequelize").QueryInterface} q
   */
  up: q => q.sequelize.transaction(async transaction => {
    const now = new Date()

    await q.bulkInsert(
      tableName,

      [{
        email: USER_EMAIL,
        password: await hash(USER_PASSWORD, 15),
        login: USER_LOGIN,
        created_at: now,
        updated_at: now
      }],

      {
        transaction
      }
    )
  }),

  /**
   * @param {import("sequelize").QueryInterface} q
   */
  down: q => q.sequelize.transaction(async transaction => {
    await q.bulkDelete(tableName, {email: "io@octetstream.me"}, {transaction})
  })
}
