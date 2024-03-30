import {Entity, Property, Unique, type Hidden} from "@mikro-orm/mysql"

import {RecordSoft} from "./RecordSoft.js"

export interface UserInput {
  email: string
  password: string
}

@Entity()
export class User extends RecordSoft implements UserInput {
  @Property<User>({type: "varchar"})
  @Unique()
  email: string

  @Property<User>({type: "varchar", hidden: true})
  password: Hidden<string>

  constructor(input: UserInput) {
    super()

    this.email = input.email
    this.password = input.password
  }
}
