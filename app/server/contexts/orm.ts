import type {MikroORM} from "@mikro-orm/mariadb"
import {createContext} from "react-router"

export const ormContext = createContext<MikroORM>()
