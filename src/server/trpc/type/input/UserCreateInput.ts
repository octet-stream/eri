import {z, infer as Infer} from "zod"

export const UserCreateInput = z
  .object({
    login: z.string().regex(/^[a-z0-9_]+$/i, "Invalid login"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must contain at least 8 characters"),
    code: z.string().length(16, "Verification code must contain 16 characters")
  })
  .strict()

export interface IUserCreateInput extends Infer<typeof UserCreateInput> { }
