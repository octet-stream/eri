import {useEffect, useState} from "react"
import {useRouter} from "next/router"
import {Helmet} from "react-helmet"

import t from "prop-types"

import "style/globals.css"
import "style/spacing.css"
import "style/colors.css"

import Progress from "component/Progress"
import DarkMode from "component/DarkMode"

const baseTitle = "Eri's Blog"

/**
 * @type {React.FunctionComponent<{}>}
 */
function App({Component, pageProps}) {
  const [isAnimatingProgress, setIsAnimatingProgress] = useState(false)
  const {events} = useRouter()

  useEffect(() => {
    const start = () => setIsAnimatingProgress(true)

    const end = () => setIsAnimatingProgress(false)

    events.on("routeChangeStart", start)
    events.on("routeChangeComplete", end)
    events.on("routeChangeError", end)

    return () => {
      end()
      events.off("routeChangeStart", start)
      events.off("routeChangeComplete", end)
      events.off("routeChangeError", end)
    }
  }, [])

  return (
    <DarkMode>
      <Helmet
        htmlAttributes={{lang: "en"}}
        defaultTitle={baseTitle}
        meta={[
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1"
          },
          {
            name: "og:title",
            content: baseTitle
          }
        ]}
      />

      <Component {...pageProps} />

      <Progress isAnimating={isAnimatingProgress} />
    </DarkMode>
  )
}

App.propTypes = {
  Component: t.func.isRequired,
  pageProps: t.shape().isRequired
}

export default App
