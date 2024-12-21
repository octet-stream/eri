import {Entity, Property} from "@mikro-orm/mariadb"

import {Node} from "./Node.js"

@Entity()
export class Passkey extends Node {
  @Property({type: "datetime"})
  createdAt: Date = new Date()

  @Property({type: "string"})
  name?: string

  @Property({type: "string"})
  publicKey!: string

  @Property({type: "string"})
  credentialID!: string

  @Property({type: "string"})
  counter!: number

  @Property({type: "string"})
  deviceType!: string

  @Property({type: "string"})
  backedUp!: string

  @Property({type: "string"})
  transports!: string
}
