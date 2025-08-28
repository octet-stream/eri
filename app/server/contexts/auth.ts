import {unstable_createContext as createContext} from "react-router"

import type {Auth} from "../lib/auth/auth.ts"

export const authContext = createContext<Auth>()
