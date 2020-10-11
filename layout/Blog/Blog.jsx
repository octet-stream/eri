import t from "prop-types"

import Header from "component/Header"

import {container, content} from "./blog.module.css"

const Blog = ({children}) => (
  <div className={container}>
    <div className={content}>
      <Header />

      {children}
    </div>
  </div>
)

Blog.propTypes = {
  children: t.node.isRequired
}

export default Blog
