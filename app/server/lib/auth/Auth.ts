import {betterAuth} from "better-auth"

import {password} from "./password.js"

import config from "../config.js"
import {orm} from "../db/orm.js"

import {mikroOrmAdapter} from "./mikroOrmAdapter.js"

export const auth = betterAuth({
  database: mikroOrmAdapter(orm),
  secret: config.auth.secrets[0], // TODO: Update config tu replace `secrets` with `secret` (we use one secret anyway)
  emailAndPassword: {
    enabled: true,
    password: {
      // I would rather handle these in Mikro ORM Subscribers, but ok.
      hash: input => password.hash(input),
      verify: input => password.verify(input.hash, input.password)
    }
  },
  advanced: {
    cookiePrefix: "eri", // TODO: Make this configurable
    generateId: false // Handled by the ORM
  }
})
