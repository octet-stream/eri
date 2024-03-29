import {Property, type Opt} from "@mikro-orm/mysql"

import {Record} from "./Record.js"

export abstract class RecordSoft extends Record {
  @Property({type: "datetime", nullable: true, default: null})
  removedAt: Opt<Date> | null = null
}
