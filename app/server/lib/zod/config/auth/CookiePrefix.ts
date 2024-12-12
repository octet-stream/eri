import {z} from "zod"

export const CookiePrefix = z
  .string()
  .min(1)
  .regex(/^[a-z0-9_-]+$/i)
  .default("eri")
