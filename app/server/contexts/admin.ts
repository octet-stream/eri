import {unstable_createContext as createContext} from "react-router"

import type {AdminViewer} from "../lib/admin/AdminArgs.ts"

export const adminContext = createContext<AdminViewer>()
