import {betterAuth} from "better-auth"

import {hash, verify} from "./password.js"

import config from "../config.js"
import {orm} from "../db/orm.js"

import {mikroOrmAdapter} from "./mikroOrmAdapter.js"

export const auth = betterAuth({
  database: mikroOrmAdapter(orm),
  secret: config.auth.secret,
  emailAndPassword: {
    enabled: true,
    password: {
      hash: password => hash(password),
      verify: ({hash, password}) => verify(hash, password)
    }
  },
  advanced: {
    cookiePrefix: "eri", // TODO: Make this configurable
    generateId: false // Handled by the ORM
  }
})
