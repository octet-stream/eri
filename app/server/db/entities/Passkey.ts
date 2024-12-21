import {Entity, Property, ManyToOne} from "@mikro-orm/mariadb"

import {Node} from "./Node.js"
import {User} from "./User.js"

@Entity()
export class Passkey extends Node {
  @Property({type: "datetime"})
  createdAt: Date = new Date()

  @Property({type: "string", nullable: true, default: null})
  name?: string

  @Property({type: "string"})
  publicKey!: string

  @Property({type: "string"})
  credentialID!: string

  @Property({type: "integer", unsigned: true, default: 0})
  counter!: number

  @Property({type: "string"})
  deviceType!: string

  @Property({type: "string"})
  backedUp!: string

  @Property({type: "string"})
  transports!: string

  @ManyToOne(() => User, {eager: true})
  user!: string
}
