import {PrimaryKey} from "@mikro-orm/mysql"

export abstract class Node {
  @PrimaryKey({type: "uuid"})
  readonly id: string = crypto.randomUUID()
}
