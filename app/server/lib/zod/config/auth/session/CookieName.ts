import {z} from "zod"

export const CookieName = z.string().min(1).default("eri.sid")
