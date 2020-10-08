import {Fragment} from "react"

import cn from "classnames"

import Title from "component/Title"

import {
  container,
  delimiter,
  content,
  item,
  status
} from "./not-found.module.css"

/**
 * @type {React.FC}
 */
const NotFound = () => (
  <Fragment>
    <Title title="Page not found" />

    <div className={container}>
      <div className={content}>
        <h1 className={item}>
          404
        </h1>

        <div className={delimiter} />

        <div className={cn(item, status)}>
          Page not found
        </div>
      </div>
    </div>
  </Fragment>
)

export default NotFound
