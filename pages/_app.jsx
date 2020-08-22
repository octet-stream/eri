import {Helmet} from "react-helmet"
import {Fragment} from "react"

import t from "prop-types"

import "style/globals.css"
import "style/spacing.css"
import "style/colors.css"

const baseTitle = "Eri's Blog"

const App = ({Component, pageProps}) => (
  <Fragment>
    <Helmet
      htmlAttributes={{lang: "en"}}
      defaultTitle={baseTitle}
      title={baseTitle}
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
  </Fragment>
)

App.propTypes = {
  Component: t.func.isRequired,
  pageProps: t.shape().isRequired
}

export default App
