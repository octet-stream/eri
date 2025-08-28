import {betterAuth} from "better-auth"
import {passkey} from "better-auth/plugins/passkey"
import {mikroOrmAdapter} from "better-auth-mikro-orm"

import config from "../config.ts"

import {orm} from "../db/orm.ts"

import {hash, verify} from "./password.ts"

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
  plugins: [
    // TODO: Add configuration
    passkey()
  ],
  advanced: {
    cookiePrefix: config.auth.cookiePrefix,
    database: {
      generateId: false // Handled by the ORM
    }
  },
  telemetry: {
    enabled: false
  }
})

export type Auth = typeof auth
