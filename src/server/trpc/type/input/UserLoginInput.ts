import {z, infer as Infer} from "zod"

export const UserLoginInput = z.object({
  email: z.string().email("Invalid email"),
  password: z.string()
})

export interface IUserLoginInput extends Infer<typeof UserLoginInput> { }
