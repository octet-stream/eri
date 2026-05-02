import {defineEntity, p} from "@mikro-orm/mariadb"
import type {User as BAUser} from "better-auth"
import type {EntityShape} from "../../lib/db/orm.ts"
import {Passkey} from "./Passkey.ts"
import {RecordSoft} from "./RecordSoft.ts"

export interface UserBase extends Omit<BAUser, "name"> {}

export type UserInput = Pick<UserBase, "email">

export const UserSchema = defineEntity({
  name: "User",
  extends: RecordSoft,
  properties: {
    email: p.string(),
    emailVerified: p.boolean().default(false),
    name: p.string().persist(false).default(""),
    image: p.string().persist(false).default(""),
    passkeys: () => p.oneToMany(Passkey).mappedBy(passkey => passkey.user)
  } satisfies EntityShape<UserBase, keyof RecordSoft>,
  uniques: [
    {
      properties: "email"
    }
  ]
})

/**
 * Represents a user stored in database
 */
export class User extends UserSchema.class implements UserBase {}

UserSchema.setClass(User)
