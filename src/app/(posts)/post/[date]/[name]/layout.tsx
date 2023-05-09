import type {FC, ReactNode} from "react"

import {PostNav} from "app/(posts)/_/component/PostNav"

interface Props {
  children: ReactNode
}

const Layout: FC<Props> = ({children}) => (
  <article className="flex flex-col flex-1">
    <PostNav />

    {children}
  </article>
)

export default Layout
