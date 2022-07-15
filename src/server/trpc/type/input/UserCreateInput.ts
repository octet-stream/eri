import {z, infer as Infer} from "zod"

import {UserCreateSuperInput} from "./UserCreateSuperInput"

export const UserCreateInput = UserCreateSuperInput
  .extend({
    code: z.string().length(16, "Verification code must contain 16 characters")
  })
  .strict()

export interface IUserCreateInput extends Infer<typeof UserCreateInput> { }
