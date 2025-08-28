import {Entity, ManyToOne, Property, Unique} from "@mikro-orm/mariadb"
import type {Session as SessionSchema} from "better-auth"

import type {Maybe} from "../../../lib/types/Maybe.ts"

import {Record} from "./Record.ts"
import {User} from "./User.ts"

export interface DatabaseSession extends Omit<SessionSchema, "userId"> {}

/**
 * Represents a session stored in a database
 */
@Entity()
export class Session extends Record implements DatabaseSession {
  @Property<Session>({type: "string"})
  @Unique()
  token!: string

  /**
   * Date a time of session expiration
   */
  @Property<Session>({type: "datetime"})
  expiresAt!: Date

  /**
   * The IP address of the device
   */
  @Property<Session>({type: "string", nullable: true, default: null})
  ipAddress?: Maybe<string> = null

  /**
   * The user agent information of the device
   */
  @Property<Session>({type: "string", nullable: true, default: null})
  userAgent?: Maybe<string> = null

  /**
   * User associated with the sesssion
   */
  @ManyToOne(() => User, {eager: true})
  user!: User
}
