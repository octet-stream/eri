import type {infer as Infer} from "zod"

import {Login} from "server/trpc/type/common/Login"
import {Record} from "server/trpc/type/common/Record"

export const UserOutput = Record.extend({
  login: Login
})

export type TUserOutput = Infer<typeof UserOutput>
