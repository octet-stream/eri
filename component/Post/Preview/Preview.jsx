import Link from "next/link"
import t from "prop-types"

import format from "lib/helper/util/formatDateProximity"

import {title} from "./preview.module.css"

/**
 * @type {React.FunctionComponent<{}>}
 */
const Preview = ({post}) => (
  <article>
    <header>
      <h3 className={title}>
        <Link href="/[date]/[name]" as={post.slug}>
          <a>{post.title}</a>
        </Link>
      </h3>

      <div>
        <small>
          Posted by {post.creator.login} {
            format(post.dates.createdAt)
          }
        </small>
      </div>
    </header>
  </article>
)

Preview.propTypes = {
  post: t.shape().isRequired
}

export default Preview
