import {Op as op} from "sequelize"

import Providers from "next-auth/providers"
import NextAuth from "next-auth"
import pick from "lodash/pick"

import db from "server/lib/db/connection"

import User from "server/model/User"

/**
 * @const options
 */
const options = {
  providers: [
    Providers.Credentials({
      name: "Log in",
      credentials: {
        username: {
          type: "email",
          placeholder: "Email"
        },
        password: {
          type: "password",
          placeholder: "Password"
        }
      },

      /**
       * @param {Object} credentials
       * @param {string} credentials.username
       * @param {string} credentials.password
       *
       * @return {Promise<{id: string, createdAt: Date}>}
       */
      authorize: ({username, password}) => db.transaction(async transaction => {
        const user = await User.findOne({
          transaction,
          where: {
            [op.or]: [
              {
                email: username
              },
              {
                login: username
              }
            ]
          }
        })

        if (!user) {
          throw Error("Can't find a user.")
        }

        if (!(await user.comparePassword(password))) {
          throw Error("Incorrect password.")
        }

        return pick(user.toJSON(), ["id", "createdAt"])
      })
    })
  ]
}

export default (req, res) => NextAuth(req, res, options)
