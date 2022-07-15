import {Entity, Property, PrimaryKey, ManyToOne} from "@mikro-orm/core"
import {nanoid} from "nanoid"

import {User} from "./User"

@Entity()
export class InvitationCode {
  /**
   * Invitation code payload. Should be included in invitation email
   */
  @PrimaryKey()
  code: string = nanoid(16)

  /**
   * User who created the code
   */
  @ManyToOne()
  issuer!: User

  /**
   * Email that will receive the code
   */
  @Property()
  email!: string

  @Property()
  createdAt: Date = new Date()
}
