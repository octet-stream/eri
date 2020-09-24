import {useEffect, useState} from "react"
import {node} from "prop-types"

import Context from "./Context"

const DARK_MODE_STORAGE_KEY = "@@ERI_DARK_MODE_ENABLED"

/**
 * Returns default stage derived from the sessionStore on client or false on the server
 *
 * @return {boolean}
 */
function getDedaultState() {
  if (!process.browser) {
    return false
  }

  return sessionStorage.getItem(DARK_MODE_STORAGE_KEY) === "true"
}

/**
 * Distributes dark mode settings depending on a user's system preferences.
 *
 * Visit following links to get more information:
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme prefers-color-scheme},
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia matchMedia}
 *
 * @type {React.FunctionComponent<{children: React.ReactNode}>}
 */
const DarkMode = ({children}) => {
  const [isEnabled, set] = useState(getDedaultState())

  useEffect(() => {
    if (!process.browser) {
      return undefined
    }

    /**
     * Changes the dark mode status
     *
     * @param {MediaQueryList} event
     */
    const listener = ({matches}) => {
      set(matches)
      sessionStorage.setItem("@@ERI_DARK_MODE_ENABLED", matches)
    }

    const query = matchMedia("(prefers-color-scheme: dark)")

    query.addListener(listener)

    return () => query.removeListener(listener)
  }, [])

  const toggle = () => set(!isEnabled)

  return (
    <Context.Provider value={{isEnabled, toggle}}>
      {children}
    </Context.Provider>
  )
}

DarkMode.propTypes = {
  children: node.isRequired
}

export default DarkMode
