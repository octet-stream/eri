import {Lucia} from "lucia"

import {MikroORMAdapter} from "./MikroORMAdapter.js"

export const lucia = new Lucia(new MikroORMAdapter(), {
  sessionCookie: {
    name: "eri", // TODO: Make session name configurable
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
