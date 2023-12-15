/* eslint-disable no-use-before-define */

import {
  Entity,
  Property,
  PrimaryKey,
  ManyToOne,
  OptionalProps
} from "@mikro-orm/core"
import {nanoid} from "nanoid"

import type {PickKeys} from "lib/type/PickKeys"

import {User} from "./User"

@Entity({tableName: "invitation_code"})
export class InvitationCode {
  [OptionalProps]?: PickKeys<InvitationCode, "createdAt" | "code">

  /**
   * Invitation code payload. Should be included in invitation email
   */
  @PrimaryKey({type: "varchar", length: 16})
  readonly code: string = nanoid(16)

  /**
   * User who created the code
   */
  @ManyToOne({type: User})
  readonly issuer!: User

  /**
   * Email that will receive the code
   */
  @Property({type: "varchar"})
  readonly email!: string

  /**
   * Date and time the code was created
   */
  @Property({type: Date})
  readonly createdAt: Date = new Date()
}
