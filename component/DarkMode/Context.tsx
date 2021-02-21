import {createContext} from "react"

import DarkModeProps from "./DarkModeProps"

const DarkModeContext = createContext<DarkModeProps>(null)

DarkModeContext.displayName = "DarkModeContext"

export default DarkModeContext
