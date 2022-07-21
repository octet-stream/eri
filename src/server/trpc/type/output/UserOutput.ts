import {z, infer as Infer} from "zod"

import {LOGIN_PATTERN} from "server/db/entity/User"

import {Node} from "../common/Node"

export const UserOutput = Node.extend({
  login: z.string().min(1).regex(LOGIN_PATTERN, "Invalid login")
})

export interface IUserOutput extends Infer<typeof UserOutput> { }
