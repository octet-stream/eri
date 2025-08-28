import {z} from "zod"

import {App} from "./config/App.ts"
import {Auth} from "./config/Auth.ts"
import {Orm} from "./config/Orm.ts"
import {Server} from "./config/Server.ts"

export const Config = z
  .object({
    app: App,
    server: Server,
    orm: Orm,
    auth: Auth
  })
  .transform(value => Object.freeze(value))

export type IConfig = z.input<typeof Config>

export type OConfig = z.output<typeof Config>
