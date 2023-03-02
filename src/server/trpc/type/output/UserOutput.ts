import type {infer as Infer} from "zod"

import {Login} from "../common/Login"
import {Node} from "../common/Node"

export const UserOutput = Node.extend({
  login: Login
})

export type TUserOutput = Infer<typeof UserOutput>
