import {defineEntity, p} from "@mikro-orm/core"

import {Node} from "./Node.ts"

export const RecordSchema = defineEntity({
  name: "Record",
  abstract: true,
  extends: Node,
  properties: {
    /**
     * The date and time the entity is created
     */
    createdAt: p.datetime().onCreate(() => new Date()),

    /**
     * The date and time the entity was last updated
     */
    updatedAt: p
      .datetime()
      .onCreate(() => new Date())
      .onUpdate(() => new Date())
  },
  indexes: [
    {
      properties: "createdAt"
    },
    {
      properties: "updatedAt"
    }
  ]
})

/**
 * Represents abstract base database entity with comman dates
 */
export abstract class Record extends RecordSchema.class {}

RecordSchema.setClass(Record)
