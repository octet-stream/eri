import {Entity, Property, Unique, JsonType, type Hidden} from "@mikro-orm/mysql"
import type {DatabaseUser, RegisteredDatabaseUserAttributes} from "lucia"

import {RecordSoft} from "./RecordSoft.js"

export interface UserInput extends DatabaseUser {
  email: string
  password: string
}

/**
 * Represents a user stored in database
 */
@Entity()
export class User extends RecordSoft implements UserInput {
  /**
   * User email address
   */
  @Property<User>({type: "varchar"})
  @Unique()
  email: string

  /**
   * User password
   */
  @Property<User>({type: "varchar", hidden: true, lazy: true})
  password: Hidden<string>

  @Property<User>({type: JsonType})
  attributes: RegisteredDatabaseUserAttributes = {}

  constructor(input: UserInput) {
    super()

    this.email = input.email
    this.password = input.password
  }
}
