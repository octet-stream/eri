import {defineEntity, p} from "@mikro-orm/mariadb"
import type {Account as BAAccount} from "better-auth"
import type {EntityShape} from "../../lib/db/orm.ts"
import {Record} from "./Record.ts"
import {User} from "./User.ts"

type DatabaseAccount = Omit<BAAccount, "userId">

export const AccountSchema = defineEntity({
  name: "Account",
  extends: Record,
  properties: {
    /**
     * The id of the account as provided by the SSO or equal to userId for credential accounts
     */
    accountId: p.string(),

    /**
     * The id of the provider
     */
    providerId: p.string(),

    /**
     * The access token of the account.
     * Returned by the provider
     */
    accessToken: p.string().nullable(),

    /**
     * The refresh token of the account.
     * Returned by the provider
     */
    refreshToken: p.string().nullable(),

    /**
     * The time when the verification request expires
     */
    accessTokenExpiresAt: p.datetime().nullable(),

    /**
     * The time when the verification request expires
     */
    refreshTokenExpiresAt: p.datetime().nullable(),

    /**
     * The scope of the account. Returned by the provider
     */
    scope: p.string().nullable(),

    /**
     * The password of the account.
     * Mainly used for email and password authentication
     */
    password: p.string().nullable(),

    idToken: p.string().nullable(),

    /**
     * User associated with the account
     */
    user: () => p.manyToOne(User).eager(true)
  } satisfies EntityShape<DatabaseAccount, keyof Record>
})

export class Account extends AccountSchema.class {}

AccountSchema.setClass(Account)
