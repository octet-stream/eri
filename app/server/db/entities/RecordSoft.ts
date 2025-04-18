import {Index, type Opt, Property} from "@mikro-orm/mariadb"

import type {MaybeNull} from "../../../lib/types/MaybeNull.js"

import {Record} from "./Record.js"

/**
 * Represents soft-removable database entity
 */
export abstract class RecordSoft extends Record {
  /**
   * The date and time the entity have been marked as removed
   */
  @Property<RecordSoft>({type: "string", nullable: true, default: null})
  @Index()
  removedAt: MaybeNull<Opt<Date>> = null
}
