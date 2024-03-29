import {MikroORM} from "@mikro-orm/mysql"

import {config} from "./config.js"

export const orm = await MikroORM.init(config)
