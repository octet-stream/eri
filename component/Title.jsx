import Helmet from "react-helmet"

/**
 * @typedef {Object} HelmetPageTitleProps
 *
 * @prop {string} [title]
 * @prop {string} [titleTemplate]
 * @prop {Object.<string, any>} [titleAttributes]
 */

/**
 * @type {React.FunctionComponent<HelmetPageTitleProps>}
 */
const Title = ({title, titleTemplate, titleAttributes}) => (
  <Helmet
    title={title}
    titleTemplate={titleTemplate}
    titleAttributes={titleAttributes}
    meta={[{name: "og:title", content: title}]}
  />
)

export default Title
