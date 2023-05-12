import {z} from "zod"

export const UserLoginInput = z.object({
  email: z.string().email("Invalid email"),
  password: z.string()
})

export type IUserLoginInput = z.input<typeof UserLoginInput>

export type OUserLoginInput = z.output<typeof UserLoginInput>
