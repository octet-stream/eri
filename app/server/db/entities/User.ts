import {defineEntity, p} from "@mikro-orm/core"
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
    /**
     * User's email address for communication and login
     */
    email: p.string(),

    /**
     * Whether the user's email is verified
     */
    emailVerified: p.boolean().default(false),

    /**
     * @deprecated Usused and non-persistent field, but required by Better Auth for some reason
     */
    name: p.string().persist(false).default(""),

    /**
     * @deprecated Usused and non-persistent field, but required by Better Auth for some reason
     */
    image: p.string().persist(false).default(""),

    /**
     * List of passkeys created by the user
     */
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
