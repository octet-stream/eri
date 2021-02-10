import Helmet from "react-helmet"

interface HelmetPageTitleProps {
  title?: string
  titleTemplate?: string
  titleAttributes?: Object
}

const Title: React.FC<HelmetPageTitleProps> = ({title, titleTemplate, titleAttributes}) => (
  <Helmet
    title={title}
    titleTemplate={titleTemplate}
    titleAttributes={titleAttributes}
    meta={[{name: "og:title", content: title}]}
  />
)

export default Title
