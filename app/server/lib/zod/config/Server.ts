import {z} from "zod"

import {ServerPort} from "./server/ServerPort.js"

export const Server = z
  .object({
    port: ServerPort
  })
  .transform(value => Object.freeze(value))

export type IServer = z.input<typeof Server>

export type OServer = z.output<typeof Server>
