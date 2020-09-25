import Base, {Html, Head, Main, NextScript} from "next/document"
import {Helmet} from "react-helmet"

class Document extends Base {
  static async getInitialProps(...args) {
    const props = await super.getInitialProps(...args)

    return {
      ...props, helmet: Helmet.renderStatic()
    }
  }

  render() {
    const {helmet} = this.props

    return (
      <Html {...helmet.htmlAttributes.toComponent()}>
        <Head>
          {
            Object.keys(helmet)
              .filter(el => el !== "htmlAttributes" && el !== "bodyAttributes")
              .map(el => helmet[el].toComponent())
          }
        </Head>

        <body {...helmet.bodyAttributes.toComponent()}>
          <script src="/dark-mode.js" />

          <Main />

          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
