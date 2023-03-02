import type {infer as Infer} from "zod"
import {z} from "zod"

export const UserLoginInput = z.object({
  email: z.string().email("Invalid email"),
  password: z.string()
})

export type TUserLoginInput = Infer<typeof UserLoginInput>
