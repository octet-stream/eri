import {faker} from "@faker-js/faker"

import {Session, type User} from "../../app/server/db/entities.js"
import {auth} from "../../app/server/lib/auth/auth.js"

import {ormTest} from "./orm.js"

interface AdminParams {
  session: Session
  viewer: User
  request: Request
  password: string
}

export interface AdminTestContext {
  admin: AdminParams
}

export const adminTest = ormTest.extend<AdminTestContext>({
  async admin({orm}, use) {
    const password = faker.internet.password({length: 12})
    const response = await auth.api.signUpEmail({
      asResponse: true,
      body: {
        email: faker.internet.exampleEmail(),
        password,
        name: ""
      }
    })

    const headers = new Headers()

    headers.set("cookie", response.headers.get("set-cookie") as string)

    const {token} = (await response.json()) as {
      token: string
    }

    const session = await orm.em.findOneOrFail(Session, {token: token})

    await use({
      session,
      password,
      viewer: session.user,
      request: new Request("http://localhost", {headers})
    })
  }
})

export const test = adminTest
