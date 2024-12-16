import {mikroOrmAdapter} from "better-auth-mikro-orm"
import {betterAuth} from "better-auth"

import config from "../config.js"

import {orm} from "../db/orm.js"

import {hash, verify} from "./password.js"

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
    cookiePrefix: config.auth.cookiePrefix,
    generateId: false // Handled by the ORM
  }
})
