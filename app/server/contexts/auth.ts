import {unstable_createContext as createContext} from "react-router"

import type {Auth} from "../lib/auth/auth.js"

export const authContext = createContext<Auth>()
