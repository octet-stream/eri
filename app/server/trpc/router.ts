import {trpc} from "./trpc.js"

import {admin} from "./routes/admin.js"

export const router = trpc.router({
  admin
})

export type Router = typeof router
