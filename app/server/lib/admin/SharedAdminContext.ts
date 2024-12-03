import type {MikroORM} from "@mikro-orm/mariadb"
import type {Context} from "hono"

import type {Auth} from "../auth/Auth.js"

export interface SharedAdminContext {
  orm: MikroORM
  auth: Auth<Context>
}
