import {passkey} from "@better-auth/passkey"
import type {MikroORM} from "@mikro-orm/libsql"
import {betterAuth} from "better-auth"
import {mikroOrmAdapter} from "better-auth-mikro-orm"

import config from "../config.ts"
import {hash, verify} from "./password.ts"

export const createAuth = (orm: MikroORM) =>
  betterAuth({
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

export type Auth = ReturnType<typeof createAuth>
