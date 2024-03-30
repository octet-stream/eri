import {Entity, Property, Unique} from "@mikro-orm/mysql"

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

  @Property<User>({type: "varchar"})
  password: string

  constructor(input: UserInput) {
    super()

    this.email = input.email
    this.password = input.password
  }
}
