import type {infer as Infer} from "zod"
import {z} from "zod"

import {Login} from "server/trpc/type/common/Login"

export const UserCreateSuperInput = z.object({
  login: Login,
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must contain at least 8 characters")
})

export type TUserCreateSuperInput = Infer<typeof UserCreateSuperInput>
