import {faker} from "@faker-js/faker"

import {Session, type User} from "../../app/server/db/entities.ts"

import {authTest} from "./auth.ts"

interface AdminParams {
  session: Session
  viewer: User
  request: Request
  password: string
  email: string
}

export interface AdminTestContext {
  admin: AdminParams
}

export const adminTest = authTest.extend(
  "admin",

  {
    auto: true
  },

  async ({auth, orm}) => {
    const password = faker.internet.password({length: 12})
    const email = faker.internet.exampleEmail()

    const {headers: responseHeaders, response} = await auth.api.signUpEmail({
      returnHeaders: true,
      body: {
        email,
        password,
        name: "" // <- Not used, but required by this method
      }
    })

    const cookie = responseHeaders.get("set-cookie")
    if (!cookie) {
      throw new Error("Can't set cookies: No set-cookie header returned")
    }

    const headers = new Headers({cookie})
    const session = await orm.em.findOneOrFail(Session, {token: response.token})

    return {
      email,
      password,
      session,
      viewer: session.user,
      request: new Request("http://localhost", {headers})
    } satisfies AdminParams
  }
)

export const test = adminTest
