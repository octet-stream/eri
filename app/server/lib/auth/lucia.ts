import {Lucia, TimeSpan} from "lucia"

import {MikroORMAdapter} from "./MikroORMAdapter.js"

export const lucia = new Lucia(new MikroORMAdapter(), {
  sessionExpiresIn: new TimeSpan(30, "d"),
  sessionCookie: {
    name: "eri.sid", // TODO: Make session name configurable
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
