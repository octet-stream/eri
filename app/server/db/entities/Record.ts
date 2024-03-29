import {Property, Index, type Opt} from "@mikro-orm/mysql"

import {Node} from "./Node.js"

export abstract class Record extends Node {
  @Property<Record>({type: "datetime"})
  @Index()
  readonly createdAt: Opt<Date> = new Date()

  @Property<Record>({type: "datetime", onUpdate: () => new Date()})
  @Index()
  readonly updatedAt: Opt<Date> = new Date()
}
