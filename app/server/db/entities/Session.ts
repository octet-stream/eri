import {
  Entity,
  Property,
  ManyToOne,
  JsonType,
  PrimaryKey,
  type Opt
} from "@mikro-orm/mysql"
import type {DatabaseSession, RegisteredDatabaseSessionAttributes} from "lucia"

import {Record} from "./Record.js"
import {User} from "./User.js"

/**
 * Represents a session stored in a database
 */
@Entity()
export class Session extends Record implements DatabaseSession {
  @PrimaryKey({type: "varchar"})
  id!: string // Override id column for session enitity because lucia sets this column automatically

  /**
   * Date a time of session expiration
   */
  @Property<Session>({type: "datetime"})
  expiresAt!: Date

  /**
   * Additional session attributes
   */
  @Property<Session>({type: JsonType})
  attributes: RegisteredDatabaseSessionAttributes = {}

  /**
   * User associated with the sesssion
   */
  @ManyToOne(() => User, {eager: true})
  user!: User

  get userId(): Opt<string> {
    return this.user.id
  }
}
