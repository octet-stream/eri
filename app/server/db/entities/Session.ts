import {defineEntity, p} from "@mikro-orm/mariadb"
import type {Session as BASession} from "better-auth"

import type {EntityShape} from "../../lib/db/orm.ts"

import {Record} from "./Record.ts"
import {User} from "./User.ts"

export interface DatabaseSession extends Omit<BASession, "userId"> {}

export const SessionSchema = defineEntity({
  name: "Session",
  extends: Record,
  properties: {
    /**
     * Session token
     */
    token: p.string(),

    /**
     * Date a time of session expiration
     */
    expiresAt: p.datetime(),

    /**
     * The IP address of the device
     */
    ipAddress: p.string().nullable(),

    /**
     * The user agent information of the device
     */
    userAgent: p.string().nullable(),

    /**
     * User associated with the sesssion
     */
    user: () => p.manyToOne(User).eager(true)
  } satisfies EntityShape<DatabaseSession, keyof Record>,
  uniques: [
    {
      properties: "token"
    }
  ]
})

/**
 * Represents a session stored in a database
 */
export class Session extends SessionSchema.class implements DatabaseSession {}

SessionSchema.setClass(Session)
