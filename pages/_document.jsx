import Base, {Head, Main, NextScript} from "next/document"
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

    /* eslint-disable jsx-a11y/html-has-lang */
    return (
      <html {...helmet.htmlAttributes.toComponent()}>
        <Head>
          {
            Object.keys(helmet)
              .filter(el => el !== "htmlAttributes" && el !== "bodyAttributes")
              .map(el => helmet[el].toComponent())
          }
        </Head>

        <body {...helmet.bodyAttributes.toComponent()}>
          <Main />

          <NextScript />
        </body>
      </html>
    )
    /* eslint-enable jsx-a11y/html-has-lang */
  }
}

export default Document
