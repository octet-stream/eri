import {unstable_createContext as createCotext} from "react-router"

import type {Variables} from "../../server.js"

export const serverContext = createCotext<Variables>()
