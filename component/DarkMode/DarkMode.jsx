import {useState, Fragment} from "react"
import {node} from "prop-types"

// TODO: Add proper Helmet support. See: https://github.com/vercel/next.js/blob/canary/examples/with-react-helmet/pages/_document.js
import Helmet from "react-helmet"
import useMount from "react-use/lib/useMount"
import useUnmount from "react-use/lib/useUnmount"

import {light, dark} from "./colors.module.css"

import Context from "./Context"

/**
 * Manages an application wide dark mode by injecting
 * .light or .dark class to <body> tag. It uses prefers-color-scheme to
 * check whether the dark mode on or off in a system's preferences.
 */
function DarkMode({children}) {
  // TODO: This module should probably be re-imaged with SSR support
  const query = matchMedia("(prefers-color-scheme: dark)")
  const [isActive, toggle] = useState(query.matches)

  const onModeChange = ({matches}) => toggle(matches)

  useMount(() => query.addListener(onModeChange))

  useUnmount(() => query.removeListener(onModeChange))

  return (
    <Fragment>
      <Helmet>
        <body className={isActive ? dark : light} />
      </Helmet>

      <Context.Provider value={{isActive, toggle}}>
        {children}
      </Context.Provider>
    </Fragment>
  )
}

DarkMode.propTypes = {
  children: node.isRequired
}

export default DarkMode
