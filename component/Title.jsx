import Helmet from "react-helmet"
import t from "prop-types"

const Title = ({title}) => (
  <Helmet title={title} meta={[{name: "og:title", content: title}]} />
)

Title.propTypes = {
  title: t.string.isRequired
}

export default Title
