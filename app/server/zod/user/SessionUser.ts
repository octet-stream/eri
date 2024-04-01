import {z} from "zod"

import {Node} from "../common/Node.js"

export const SessionUser = z.object({
  ...Node.shape
})

export type ISessionUser = z.input<typeof SessionUser>

export type OSessionUser = z.output<typeof SessionUser>
