import {z} from "zod"

import {AdminPassword} from "./AdminPassword.js"

export const AdminUpdatePasswordInput = z.object({
  intent: z.literal("password"),
  current: AdminPassword,
  updated: AdminPassword,
  confirm: AdminPassword
})

export type IAdminUpdatePasswordInput = z.input<typeof AdminUpdatePasswordInput>

export type OAdminUpdatePasswordInput = z.output<
  typeof AdminUpdatePasswordInput
>
