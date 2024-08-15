import {z} from "zod"

export const AdminUpdateInput = z.object({
  email: z.string().email().optional()
})

export type IAdminUpdateInput = z.input<typeof AdminUpdateInput>

export type OAdminUpdateInput = z.output<typeof AdminUpdateInput>
