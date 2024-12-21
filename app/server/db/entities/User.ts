import {
  Entity,
  Property,
  Unique,
  OneToMany,
  Collection,
  type Opt
} from "@mikro-orm/mariadb"
import type {User as UserSchema} from "better-auth"

import {RecordSoft} from "./RecordSoft.js"
import {Passkey} from "./Passkey.js"

export interface UserBase extends Omit<UserSchema, "name"> {}

export type UserInput = Pick<UserBase, "email">

/**
 * Represents a user stored in database
 */
@Entity()
export class User extends RecordSoft implements UserBase {
  /**
   * User email address
   */
  @Property<User>({type: "string"})
  @Unique()
  email!: string

  @Property<User>({type: "boolean", default: false, nullable: false})
  emailVerified: Opt<boolean> = false

  @Property<User>({type: "string", persist: false})
  readonly name: Opt<string> = ""

  @Property<User>({type: "string", persist: false})
  readonly image: Opt<string> = ""

  @OneToMany(() => Passkey, "user")
  passkeys = new Collection<Passkey, this>(this)
}
