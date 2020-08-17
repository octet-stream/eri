import t from "prop-types"

import "style/globals.css"
import "style/spacing.css"

function App({Component, pageProps}) {
  return <Component {...pageProps} />
}

App.propTypes = {
  Component: t.func.isRequired,
  pageProps: t.shape().isRequired
}

export default App
