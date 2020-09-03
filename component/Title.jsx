import Helmet from "react-helmet"
import t from "prop-types"

const Title = ({title, titleTemplate, titleAttributes}) => (
  <Helmet
    title={title}
    titleTemplate={titleTemplate}
    titleAttributes={titleAttributes}
    meta={[{name: "og:title", content: title}]}
  />
)

Title.propTypes = {
  title: t.string,
  titleTemplate: t.string,
  titleAttributes: t.string
}

Title.defaultProps = {
  title: undefined,
  titleTemplate: undefined,
  titleAttributes: undefined
}

export default Title
