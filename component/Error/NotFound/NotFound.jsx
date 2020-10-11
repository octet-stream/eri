import {Fragment} from "react"

import Link from "next/link"

import Title from "component/Title"

import {
  container,
  content,
  message,
  status
} from "./not-found.module.css"

// TODO: Improve page design
/**
 * @type {React.FC}
 */
const NotFound = () => (
  <Fragment>
    <Title title="Page not found" />

    <div className={container}>
      <div className={content}>
        <div className={message}>
          <h1 className={status}>
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
