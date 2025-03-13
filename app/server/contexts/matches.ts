import {unstable_createContext as createContext} from "react-router"

import type {RouteMatchWithPattern} from "../lib/utils/routes.js"

export const matchesContext = createContext<RouteMatchWithPattern[]>()
