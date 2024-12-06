import {Entity, ManyToOne, type Opt, Property, Unique} from "@mikro-orm/mariadb"
import type {Session as SessionSchema} from "better-auth"

import type {Maybe} from "../../../lib/types/Maybe.js"

import {Record} from "./Record.js"
import {User} from "./User.js"

export interface DatabaseSession extends SessionSchema {}

/**
 * Represents a session stored in a database
 */
@Entity()
export class Session extends Record implements DatabaseSession {
  @Property<Session>({type: "varchar"})
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
  @Property<Session>({type: "varchar", nullable: true, default: null})
  ipAddress?: Maybe<string> = null

  /**
   * The user agent information of the device
   */
  @Property<Session>({type: "varchar", nullable: true, default: null})
  userAgent?: Maybe<string> = null

  /**
   * User associated with the sesssion
   */
  @ManyToOne(() => User, {eager: true})
  user!: User

  get userId(): Opt<string> {
    return this.user.id
  }
}
