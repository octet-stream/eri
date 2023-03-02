import type {infer as Infer} from "zod"
import {z} from "zod"

export const LOGIN_PATTERN = /^[a-z0-9_]+$/i

export const Login = z.string().regex(LOGIN_PATTERN, "Invalid login format")

export type TLogin = Infer<typeof Login>
