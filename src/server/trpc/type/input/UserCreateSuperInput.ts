import {z, infer as Infer} from "zod"

import {Login} from "../common/Login"

export const UserCreateSuperInput = z
  .object({
    login: Login,
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must contain at least 8 characters")
  })
  .strict()

export interface IUserCreateSuperInput extends Infer<
  typeof UserCreateSuperInput
> { }
