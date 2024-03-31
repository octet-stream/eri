import {Entity, Property, ManyToOne, JsonType, type Opt} from "@mikro-orm/mysql"
import type {DatabaseSession, RegisteredDatabaseSessionAttributes} from "lucia"

import {Record} from "./Record.js"
import {User} from "./User.js"

/**
 * Represents a session stored in a database
 */
@Entity()
export class Session extends Record implements DatabaseSession {
  /**
   * Date a time of session expiration
   */
  @Property({type: "datetime"})
  expiresAt!: Date

  /**
   * Additional session attributes
   */
  @Property({type: JsonType})
  attributes!: RegisteredDatabaseSessionAttributes

  /**
   * User associated with the sesssion
   */
  @ManyToOne(() => User, {eager: true})
  user!: User

  get userId(): Opt<string> {
    return this.user.id
  }
}
