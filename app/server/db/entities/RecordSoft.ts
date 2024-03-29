import {Property, Index, type Opt} from "@mikro-orm/mysql"

import {Record} from "./Record.js"

export abstract class RecordSoft extends Record {
  @Property<RecordSoft>({type: "datetime", nullable: true, default: null})
  @Index()
  removedAt: Opt<Date> | null = null
}
