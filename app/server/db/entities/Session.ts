import type {DatabaseSession, RegisteredDatabaseSessionAttributes} from "lucia"
import {Entity, Property, ManyToOne, JsonType} from "@mikro-orm/mysql"

import {Record} from "./Record.js"
import {User} from "./User.js"

/**
 * Represents a session stored in a database
 */
@Entity()
export class Session extends Record implements Omit<DatabaseSession, "userId"> {
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
}
