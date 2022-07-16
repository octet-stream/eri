import {randomUUID} from "node:crypto"

import {Entity, PrimaryKey} from "@mikro-orm/core"

@Entity({abstract: true})
export abstract class Base {
  @PrimaryKey()
  id: string = randomUUID()
}