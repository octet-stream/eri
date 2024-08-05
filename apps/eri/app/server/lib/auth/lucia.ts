import {Lucia} from "lucia"

import {MikroORMAdapter} from "./MikroORMAdapter.js"
import {ttl} from "./ttl.js"

export const lucia = new Lucia(new MikroORMAdapter(), {
  sessionExpiresIn: ttl,
  sessionCookie: {
    name: process.env.AUTH_SESSION_COOKIE_NAME ?? "eri.sid", // TODO: Make session name configurable
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
