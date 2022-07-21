import {z, infer as Infer} from "zod"

import {LOGIN_PATTERN} from "server/db/entity/User"

export const UserCreateSuperInput = z
  .object({
    login: z.string().regex(LOGIN_PATTERN, "Invalid login"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must contain at least 8 characters")
  })
  .strict()

export interface IUserCreateSuperInput extends Infer<
  typeof UserCreateSuperInput
> { }
