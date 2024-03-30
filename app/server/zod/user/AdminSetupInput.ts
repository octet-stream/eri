import {z} from "zod"

export const AdminSetupInput = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long")
})

export type IAdminSeupInput = z.input<typeof AdminSetupInput>

export type OAdminSetupInput = z.output<typeof AdminSetupInput>
