import {faker} from "@faker-js/faker"

import {User} from "../../../app/server/db/entities.js"

import {ormTest} from "./orm.js"

export interface UserTestContext {
  user: User
}

export const userTest = ormTest.extend<UserTestContext>({
  async user({orm}, use) {
    const user = orm.em.create(User, {
      email: faker.internet.email()
    })

    await orm.em.persistAndFlush(user)
    await use(user)
  }
})
