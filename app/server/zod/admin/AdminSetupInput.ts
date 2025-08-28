import {z} from "zod"

import {AdminLogInInput} from "./AdminLogInInput.ts"

export const AdminSetupInput = z.object({
  ...AdminLogInInput.shape
})

export type IAdminSeupInput = z.input<typeof AdminSetupInput>

export type OAdminSetupInput = z.output<typeof AdminSetupInput>
