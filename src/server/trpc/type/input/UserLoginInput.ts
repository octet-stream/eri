import type {input, output} from "zod"
import {z} from "zod"

export const UserLoginInput = z.object({
  email: z.string().email("Invalid email"),
  password: z.string()
})

export type IUserLoginInput = input<typeof UserLoginInput>

export type OUserLoginInput = output<typeof UserLoginInput>
