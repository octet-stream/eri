import {PrimaryKey} from "@mikro-orm/mariadb"
import {v7 as uuidV7} from "uuid"

/**
 * Represents base abstract database entity
 */
export abstract class Node {
  @PrimaryKey({type: "uuid"})
  readonly id: string = uuidV7()
}
