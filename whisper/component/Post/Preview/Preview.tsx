import {FC} from "react"

import Link from "next/link"

import Post from "type/Post"

import format from "lib/helper/util/formatDateProximity"

import s from "./preview.module.css"

interface PreviewProps {
  post: Post
}

const Preview: FC<PreviewProps> = ({post}) => (
  <article>
    <header>
      <h3 className={s.title}>
        <Link href={`/${post.slug}`}>
          <a>{post.title}</a>
        </Link>
      </h3>

      <div>
        <small>
          Posted by {post.author.login} {
            format(post.dates.createdAt)
          }
        </small>
      </div>
    </header>
  </article>
)

export default Preview
