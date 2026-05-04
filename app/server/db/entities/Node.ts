import {defineEntity, p} from "@mikro-orm/core"
import {v7 as uuidV7} from "uuid"

export const NodeSchema = defineEntity({
  name: "Node",
  abstract: true,
  properties: {
    id: p
      .uuid()
      .primary()
      .onCreate(() => uuidV7())
  }
})

/**
 * Represents base abstract database entity
 */
export abstract class Node extends NodeSchema.class {}

NodeSchema.setClass(Node)
