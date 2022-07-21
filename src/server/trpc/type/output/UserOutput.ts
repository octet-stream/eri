import {infer as Infer} from "zod"

import {Login} from "../common/Login"
import {Node} from "../common/Node"

export const UserOutput = Node.extend({
  login: Login
})

export interface IUserOutput extends Infer<typeof UserOutput> { }
