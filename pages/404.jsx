import {Fragment} from "react"

import cn from "classnames"

import Title from "component/Title"

import {container, content, item, status} from "style/404.module.css"

const NotFound = () => (
  <Fragment>
    <Title title="Page not found" />

    <div className={container}>
      <div className={content}>
        <h1 className={item}>
          404
        </h1>
        <div className={cn(item, status)}>
          Page not found
        </div>
      </div>
    </div>
  </Fragment>
)

export default NotFound
