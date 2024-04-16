import {z} from "zod"

import {trpc} from "./trpc.js"

export const router = trpc.router({
  hello: trpc.procedure
    .input(z.object({name: z.string().optional().default("World")}))
    .output(z.string())
    .query(({input}) => `Hello, ${input.name}`)
})

export type Router = typeof router
