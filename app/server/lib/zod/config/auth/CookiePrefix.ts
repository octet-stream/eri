import {z} from "zod"

export const CookiePrefix = z
  .string()
  .min(1)
  .regex(/^[a-z0-9_-]+$/i)
  .default("eri")

export type ICookiePrefix = z.input<typeof CookiePrefix>

export type OCookiePrefix = z.output<typeof CookiePrefix>
