import type {z} from "zod"

import {Login} from "server/trpc/type/common/Login"
import {Record} from "server/trpc/type/common/Record"

export const UserOutput = Record.extend({
  login: Login
})

export type IUserOutput = z.input<typeof UserOutput>

export type OUserOutput = z.output<typeof UserOutput>
