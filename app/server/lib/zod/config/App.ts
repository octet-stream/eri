import {z} from "zod"

import {Name} from "./app/Name.js"

export const App = z
  .object({
    name: Name
  })
  .transform(value => Object.freeze(value))

export type IApp = z.input<typeof App>

export type OApp = z.output<typeof App>
