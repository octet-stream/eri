import type {FC} from "react"

import {Header} from "component/Header"

import {BaseLayout} from "./BaseLayout"
import type {BaseLayoutProps} from "./BaseLayout"

interface Props extends BaseLayoutProps { }

export const HomeLayout: FC<Props> = ({title, children}) => (
  <BaseLayout title={title}>
    <Header>
      Blog
    </Header>

    <article>
      {children}
    </article>
  </BaseLayout>
)
