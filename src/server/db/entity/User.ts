import {randomUUID} from "node:crypto"

import {
  Entity,
  Property,
  Collection,
  OneToMany,
  Cascade,
  PrimaryKey,
  OptionalProps
} from "@mikro-orm/core"

import {compare} from "bcrypt"

import {BaseDates} from "./BaseDates"

@Entity()
export class User extends BaseDates {
  @PrimaryKey()
  id: string = randomUUID()

  @Property({unique: true})
  login!: string

  @Property({unique: true})
  email?: string

  @Property({nullable: true, hidden: true})
  emailVerified: Date | null = null

  @Property({hidden: true})
  password!: string

  /**
   * Checks is given string matches user's current password
   */
  async isPasswordValid(password: string): Promise<boolean> {
    return compare(password, this.password)
  }

  [OptionalProps]?: "createdAt" | "updatedAt"
}
