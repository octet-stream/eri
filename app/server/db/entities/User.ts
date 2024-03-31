import {Entity, Property, Unique, type Hidden} from "@mikro-orm/mysql"

import {RecordSoft} from "./RecordSoft.js"

export interface UserInput {
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

  constructor(input: UserInput) {
    super()

    this.email = input.email
    this.password = input.password
  }
}
