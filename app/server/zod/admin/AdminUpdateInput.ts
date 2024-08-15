import {z} from "zod"

import {AdminUpdateMainInfoInput} from "./AdminUpdateMainInfoInput.js"
import {AdminUpdatePasswordInput} from "./AdminUpdatePasswordInput.js"

export const AdminUpdateInput = z.discriminatedUnion("intent", [
  AdminUpdateMainInfoInput,
  AdminUpdatePasswordInput
])

export type IAdminUpdateInput = z.input<typeof AdminUpdateInput>

export type OAdminUpdateInput = z.output<typeof AdminUpdateInput>
