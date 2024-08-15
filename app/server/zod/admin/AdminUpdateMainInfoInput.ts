import {z} from "zod"

export const AdminUpdateMainInfoInput = z.object({
  intent: z.literal("info"),
  email: z.string().email()
})

export type IAdminUpdateMainInfoInput = z.input<typeof AdminUpdateMainInfoInput>

export type OAdminUpdateMainInfoInput = z.output<
  typeof AdminUpdateMainInfoInput
>
