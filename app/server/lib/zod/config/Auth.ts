import {z} from "zod"

import {Secrets} from "./auth/Secrets.js"
import {Session} from "./auth/Session.js"

export const Auth = z
  .object({
    secrets: Secrets,
    session: Session
  })
  .transform(value => Object.freeze(value))

export type IAuth = z.input<typeof Auth>

export type OAuth = z.output<typeof Auth>
