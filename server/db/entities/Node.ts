import {Property} from "@mikro-orm/mysql"

export abstract class Node {
  @Property({type: "uuid"})
  readonly id: string = crypto.randomUUID()
}
