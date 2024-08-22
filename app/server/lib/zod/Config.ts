import {z} from "zod"

import {Server} from "./config/Server.js"
import {Auth} from "./config/Auth.js"
import {App} from "./config/App.js"
import {Orm} from "./config/Orm.js"

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
