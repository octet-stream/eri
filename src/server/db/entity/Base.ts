import {randomUUID} from "node:crypto"

import {PrimaryKey} from "@mikro-orm/core"

import type {ONode} from "server/trpc/type/common/Node"

export abstract class Base implements ONode {
  /**
   * Unique entity identifier (UUID)
   */
  @PrimaryKey()
  readonly id: string = randomUUID() // TODO: Replace with uuid v7 when it will become available, for natural timestamp-based order. See https://github.com/uuidjs/uuid/pull/681
}
