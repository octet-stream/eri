import {Entity, Property} from "@mikro-orm/mariadb"

import {Record} from "./Record.js"

@Entity()
export class Verification extends Record {
  /**
   * Unique identifier for each verification
   */
  @Property<Verification>({type: "varchar"})
  identifier!: string

  /**
   * The value to be verified
   */
  @Property<Verification>({type: "varchar"})
  value!: string

  /**
   * The time when the verification request expires
   */
  @Property({type: "datetime"})
  expiresAt!: Date
}
