import {randomUUID} from "node:crypto"

import {Entity, PrimaryKey} from "@mikro-orm/core"

@Entity({abstract: true})
export abstract class Base {
  @PrimaryKey()
  readonly id: string = randomUUID() // TODO: Replace with uuid v7 when it will become available, for natural timestamp-based order. See https://github.com/uuidjs/uuid/pull/681
}
