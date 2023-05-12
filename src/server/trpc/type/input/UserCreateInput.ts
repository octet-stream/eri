import {z} from "zod"

import {UserCreateSuperInput} from "./UserCreateSuperInput"

export const UserCreateInput = UserCreateSuperInput.extend({
  code: z.string().length(16, "Verification code must contain 16 characters")
})

export type IUserCreateInput = z.input<typeof UserCreateInput>

export type OUserCreateInput = z.output<typeof UserCreateInput>
