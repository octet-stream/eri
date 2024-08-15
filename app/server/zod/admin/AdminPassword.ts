import {z} from "zod"

export const AdminPassword = z
  .string()
  .min(8, "Password must be at least 8 characters long")

export type IAdminPassword = z.input<typeof AdminPassword>

export type OAdminPassword = z.output<typeof AdminPassword>
