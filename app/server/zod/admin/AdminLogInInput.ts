import {z} from "zod"

import {AdminPassword} from "./AdminPassword.ts"

export const AdminLogInInput = z.object({
  email: z.string().email(),
  password: AdminPassword
})

export type IAdminLogInInput = z.input<typeof AdminLogInInput>

export type OAdminLogInInput = z.output<typeof AdminLogInInput>
