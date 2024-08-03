import {z} from "zod"

export const AdminLogInInput = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long")
})

export type IAdminLogInInput = z.input<typeof AdminLogInInput>

export type OAdminLogInInput = z.output<typeof AdminLogInInput>
