import type {input, output} from "zod"
import {z} from "zod"

export const LOGIN_PATTERN = /^[a-z0-9_]+$/i

export const Login = z.string().regex(LOGIN_PATTERN, "Invalid login format")

export type ILogin = input<typeof Login>

export type OLogin = output<typeof Login>
