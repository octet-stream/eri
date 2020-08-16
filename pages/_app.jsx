import t from "prop-types"

import "styles/globals.css"

function App({Component, pageProps}) {
  return <Component {...pageProps} />
}

App.propTypes = {
  Component: t.func.isRequired,
  pageProps: t.shape().isRequired
}

export default App
