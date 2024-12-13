import {Entity, Property, ManyToOne, type Opt} from "@mikro-orm/mariadb"

import type {Maybe} from "../../../lib/types/Maybe.js"

import {Record} from "./Record.js"
import {User} from "./User.js"

@Entity()
export class Account extends Record {
  /**
   * The id of the account as provided by the SSO or equal to userId for credential accounts
   */
  @Property<Account>({type: "varchar"})
  accountId!: string

  /**
   * The id of the provider
   */
  @Property<Account>({type: "varchar"})
  providerId!: string

  /**
   * The access token of the account.
   * Returned by the provider
   */
  @Property<Account>({type: "varchar", nullable: true, default: null})
  accessToken?: Maybe<Opt<string>>

  /**
   * The refresh token of the account.
   * Returned by the provider
   */
  @Property<Account>({type: "varchar", nullable: true, default: null})
  refreshToken?: Maybe<Opt<string>>

  /**
   * The time when the verification request expires
   */
  @Property<Account>({type: "datetime", nullable: true, default: null})
  accessTokenExpiresAt?: Maybe<Opt<Date>>

  /**
   * The time when the verification request expires
   */
  @Property<Account>({type: "datetime", nullable: true, default: null})
  refreshTokenExpiresAt?: Maybe<Opt<Date>>

  /**
   * The scope of the account. Returned by the provider
   */
  @Property<Account>({type: "varchar", nullable: true, default: null})
  scope?: Maybe<Opt<string>>

  /**
   * The password of the account.
   * Mainly used for email and password authentication
   */
  @Property<Account>({type: "varchar", nullable: true, default: null})
  password?: Maybe<Opt<string>>

  /**
   * User associated with the account
   */
  @ManyToOne(() => User, {eager: true})
  user!: User
}
