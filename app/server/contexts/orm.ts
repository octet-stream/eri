import type {MikroORM} from "@mikro-orm/mariadb"
import {unstable_createContext as createContext} from "react-router"

export const ormContext = createContext<MikroORM>()
