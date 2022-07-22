import {
  Entity,
  Property,
  Enum,
  OptionalProps
} from "@mikro-orm/core"

import {compare} from "bcrypt"

import {BaseDates} from "./BaseDates"
import type {OptionalDates} from "./BaseDates"

export enum UserRoles {
  SUPER = "super",
  REGULAR = "regular"
}

@Entity()
export class User extends BaseDates {
  [OptionalProps]?: OptionalDates | "role"

  /**
   * User unique login
   */
  @Property({unique: true})
  login!: string

  /**
   * User private email address
   */
  @Property({unique: true})
  email?: string

  /**
   * The date and time user's email was verified
   */
  @Property({nullable: true, hidden: true})
  emailVerified: Date | null = null

  /**
   * User password
   */
  @Property({hidden: true})
  password!: string

  /**
   * User role
   */
  @Enum({items: () => UserRoles, default: UserRoles.REGULAR})
  role: UserRoles = UserRoles.REGULAR

  /**
   * Checks is given string matches user's current password
   */
  async isPasswordValid(password: string): Promise<boolean> {
    return compare(password, this.password)
  }
}
