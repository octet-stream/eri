import {useEffect, useState, FC} from "react"
import {Helmet} from "react-helmet"

import Context from "./Context"

const DARK_MODE_STORAGE_KEY = "@@ERI_DARK_MODE_ENABLED"

/**
 * Returns default stage derived from the sessionStore on client or false on the server
 */
function getDedaultState(): boolean {
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
 */
const DarkMode: FC = ({children}) => {
  const [isEnabled, set] = useState(getDedaultState())

  useEffect(() => {
    if (!process.browser) {
      return undefined
    }

    /**
     * Changes the dark mode status
     *
     * @param event
     */
    const listener = ({matches}: MediaQueryListEvent) => {
      set(matches)
      sessionStorage.setItem(DARK_MODE_STORAGE_KEY, String(matches))
    }

    const query = matchMedia("(prefers-color-scheme: dark)")

    query.addEventListener("change", listener, true)

    return () => query.removeEventListener("change", listener, true)
  }, [])

  const toggle = () => set(!isEnabled)

  return (
    <Context.Provider value={{isEnabled, toggle}}>
      <Helmet>
        <body className={isEnabled ? "dark" : "light"} />
      </Helmet>

      {children}
    </Context.Provider>
  )
}

export default DarkMode
