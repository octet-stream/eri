import {Entity, Property, PrimaryKey, ManyToOne} from "@mikro-orm/core"
import {nanoid} from "nanoid"

import {User} from "./User"

@Entity()
export class InvitationCode {
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
