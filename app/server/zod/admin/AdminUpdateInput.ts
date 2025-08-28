import {z} from "zod"

import {AdminUpdateMainInfoInput} from "./AdminUpdateMainInfoInput.ts"
import {AdminUpdatePasswordInput} from "./AdminUpdatePasswordInput.ts"

export const AdminUpdateInput = z.discriminatedUnion("intent", [
  AdminUpdateMainInfoInput,
  AdminUpdatePasswordInput
])

export type IAdminUpdateInput = z.input<typeof AdminUpdateInput>

export type OAdminUpdateInput = z.output<typeof AdminUpdateInput>
