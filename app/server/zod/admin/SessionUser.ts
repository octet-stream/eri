import {z} from "zod"

import {Node} from "../common/Node.js"

export const SessionUser = Node.extend({
  email: z.string().email()
})

export type ISessionUser = z.input<typeof SessionUser>

export type OSessionUser = z.output<typeof SessionUser>
