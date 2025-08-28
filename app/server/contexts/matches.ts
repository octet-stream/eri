import {unstable_createContext as createContext} from "react-router"

import type {RouteMatchWithPattern} from "../lib/utils/routes.ts"

export const matchesContext = createContext<RouteMatchWithPattern[]>()
