import type {input, output} from "zod"

import {Login} from "server/trpc/type/common/Login"
import {Record} from "server/trpc/type/common/Record"

export const UserOutput = Record.extend({
  login: Login
})

export type IUserOutput = input<typeof UserOutput>

export type OUserOutput = output<typeof UserOutput>
