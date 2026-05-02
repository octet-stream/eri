import {defineEntity, p} from "@mikro-orm/mariadb"

import {Record} from "./Record.ts"

export const RecordSoftSchema = defineEntity({
  name: "RecordSoft",
  abstract: true,
  extends: Record,
  properties: {
    /**
     * The date and time the entity have been marked as removed
     */
    removedAt: p.datetime().nullable().default(null)
  },
  indexes: [
    {
      properties: "removedAt"
    }
  ]
})

/**
 * Represents soft-removable database entity
 */
export abstract class RecordSoft extends RecordSoftSchema.class {}

RecordSoftSchema.setClass(RecordSoft)
