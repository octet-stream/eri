import {FC} from "react"

import Header from "component/Header"

import s from "./blog.module.css"

const Blog: FC = ({children}) => (
  <div className={s.container}>
    <div className={s.content}>
      <Header />

      {children}
    </div>
  </div>
)

export default Blog
