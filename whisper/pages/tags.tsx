import {FC} from "react"

import BlogLayout from "layout/Blog"
import layout from "lib/hoc/layout"

const Tags: FC = () => (
  <div>Tags index will be here</div>
)

export default layout(BlogLayout)(Tags)
