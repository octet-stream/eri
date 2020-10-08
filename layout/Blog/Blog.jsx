import ErrorBoundary from "react-error-boundary"
import t from "prop-types"

import {container, content} from "./blog.module.css"

const Blog = ({children}) => (
  <div className={container}>
    <div className={content}>{children}</div>
  </div>
)

Blog.propTypes = {
  children: t.node.isRequired
}

export default Blog
