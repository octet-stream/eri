import {Entity, Property} from "@mikro-orm/core"

import {Base} from "./Base"

@Entity({abstract: true})
export abstract class BaseDates extends Base {
  @Property()
  readonly createdAt: Date = new Date()

  @Property({onUpdate: () => new Date()})
  readonly updatedAt: Date = new Date()
}
