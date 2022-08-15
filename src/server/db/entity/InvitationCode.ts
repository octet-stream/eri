import {
  Entity,
  Property,
  PrimaryKey,
  ManyToOne,
  OptionalProps
} from "@mikro-orm/core"
import {nanoid} from "nanoid"

import type {OptionalDates} from "./BaseDates"
import {User} from "./User"

@Entity()
export class InvitationCode {
  [OptionalProps]?: OptionalDates | "code"

  /**
   * Invitation code payload. Should be included in invitation email
   */
  @PrimaryKey()
  readonly code: string = nanoid(16)

  /**
   * User who created the code
   */
  @ManyToOne()
  readonly issuer!: User

  /**
   * Email that will receive the code
   */
  @Property()
  readonly email!: string

  @Property()
  readonly createdAt: Date = new Date()
}
