import {Entity, ManyToOne, Property} from "@mikro-orm/mariadb"

import {Record} from "./Record.ts"
import {User} from "./User.ts"

@Entity()
export class Passkey extends Record {
  /**
   * The name of the passkey
   */
  @Property({type: "string", nullable: true, default: null})
  name?: string

  /**
   * The public key of the passkey
   */
  @Property({type: "string"})
  publicKey!: string

  /**
   * The unique identifier of the registered credential
   */
  @Property({type: "string"})
  credentialID!: string

  /**
   * The counter of the passkey
   */
  @Property({type: "integer", unsigned: true, default: 0})
  counter!: number

  /**
   * The type of device used to register the passkey
   */
  @Property({type: "string"})
  deviceType!: string

  /**
   * Whether the passkey is backed up
   */
  @Property({type: "boolean"})
  backedUp!: boolean

  /**
   * The transports used to register the passkey
   */
  @Property({type: "string"})
  transports!: string

  /**
   * The user associated with the passkey
   */
  @ManyToOne(() => User, {eager: true})
  user!: string
}
