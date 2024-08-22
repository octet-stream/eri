import {z} from "zod"

import {CookieName} from "./session/CookieName.js"

export const Session = z
  .object({
    name: CookieName
  })
  .transform(value => Object.freeze(value))

export type ISession = z.input<typeof Session>

export type OSession = z.output<typeof Session>
