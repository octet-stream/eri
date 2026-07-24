import type {MikroORM} from "@mikro-orm/libsql"
import {createContext} from "react-router"

export const ormContext = createContext<MikroORM>()
