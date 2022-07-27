import type {FC} from "react"

import {PostHeader} from "component/PostHeader"

import {BaseLayout} from "./BaseLayout"
import type {BaseLayoutProps} from "./BaseLayout"

interface Props extends BaseLayoutProps {
  title: string
}

export const PostLayout: FC<Props> = ({title, children}) => (
  <BaseLayout title={title}>
    <PostHeader />

    <article>
      {children}
    </article>
  </BaseLayout>
)
