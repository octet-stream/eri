import {Entity, Property, Unique} from "@mikro-orm/mysql"

import {RecordSoft} from "./RecordSoft.js"

export interface UserInput {
  login: string
  email: string
  password: string
}

@Entity()
export class User extends RecordSoft implements UserInput {
  @Property({type: "varchar"})
  @Unique()
  login: string

  @Property({type: "varchar"})
  @Unique()
  email: string

  @Property()
  password: string

  constructor(input: UserInput) {
    super()

    this.login = input.login
    this.email = input.email
    this.password = input.password
  }
}
