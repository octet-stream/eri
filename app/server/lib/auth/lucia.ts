import {Lucia} from "lucia"

import config from "../config.js"

import {MikroORMAdapter} from "./MikroORMAdapter.js"
import {ttl} from "./ttl.js"

export const lucia = new Lucia(new MikroORMAdapter(), {
  sessionExpiresIn: ttl,
  sessionCookie: {
    name: config.auth.session.name,
    attributes: {
      secure: process.env.NODE_ENV === "production"
    }
  }
})

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia
  }
}
