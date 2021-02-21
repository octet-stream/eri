import {Fragment, FC} from "react"

import Link from "next/link"

import Title from "component/Title"

import s from "./not-found.module.css"

// TODO: Improve page design
const NotFound: FC = () => (
  <Fragment>
    <Title title="Page not found" />

    <div className={s.container}>
      <div className={s.content}>
        <div className={s.message}>
          <h1 className={s.status}>
            404
          </h1>

          <div>
            This page could not be found.
          </div>
        </div>

        <div>
          <div>
            These suggestions may help you:
          </div>
          <ul>
            <li>
              Return to the <Link href="/"><a>home page</a></Link>
            </li>

            <li>
              Check if the URL countains typos
            </li>

            {/* <li>
              <span>Open a </span>
              <Link href="/search"><a>search index</a></Link>
              <span> to find a post</span>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  </Fragment>
)

export default NotFound
