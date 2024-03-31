import {PrimaryKey} from "@mikro-orm/mysql"

/**
 * Represents base abstract database entity
 */
export abstract class Node {
  @PrimaryKey({type: "uuid"})
  readonly id: string = crypto.randomUUID()
}
