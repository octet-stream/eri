import {z} from "zod"

import {Login} from "server/trpc/type/common/Login"

export const UserCreateSuperInput = z.object({
  login: Login,
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must contain at least 8 characters")
})

export type IUserCreateSuperInput = z.input<typeof UserCreateSuperInput>

export type OUserCreateSuperInput = z.output<typeof UserCreateSuperInput>
