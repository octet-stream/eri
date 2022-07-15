import {z, infer as Infer} from "zod"

export const UserCreateSuperInput = z
  .object({
    login: z.string().regex(/^[a-z0-9_]+$/i, "Invalid login"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must contain at least 8 characters")
  })
  .strict()

export interface IUserCreateSuperInput extends Infer<
  typeof UserCreateSuperInput
> { }
