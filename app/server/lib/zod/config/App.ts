import {z} from "zod"

import {Name} from "./app/Name.ts"

export const App = z
  .object({
    /**
     * Name of the application
     */
    name: Name
  })
  .transform(value => Object.freeze(value))

export type IApp = z.input<typeof App>

export type OApp = z.output<typeof App>
