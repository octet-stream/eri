import Base, {Html, Head, Main, NextScript, DocumentContext} from "next/document"
import {Helmet, HelmetData} from "react-helmet"

class Document extends Base<{helmet: HelmetData}> {
  static async getInitialProps(ctx: DocumentContext) {
    const props = await super.getInitialProps(ctx)

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
