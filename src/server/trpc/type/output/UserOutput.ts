import {z, infer as Infer} from "zod"

import {Node} from "../common/Node"

export const UserOutput = Node.extend({
  login: z.string().min(1).regex(/^[a-z0-9_]+$/i, "Invalid login")
})

export interface IUserOutput extends Infer<typeof UserOutput> { }
