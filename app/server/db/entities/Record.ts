import {Property, Index, type Opt} from "@mikro-orm/mariadb"

import {Node} from "./Node.js"

/**
 * Represents abstract base database entity with comman dates
 */
export abstract class Record extends Node {
  /**
   * The date and time the entity is created
   */
  @Property<Record>({type: "datetime"})
  @Index()
  readonly createdAt: Opt<Date> = new Date()

  /**
   * The date and time the entity was last updated
   */
  @Property<Record>({type: "datetime", onUpdate: () => new Date()})
  @Index()
  readonly updatedAt: Opt<Date> = new Date()
}
