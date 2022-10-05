import type {FC} from "react"

import {EditPostHeader} from "component/Header/EditPostHeader"

import {BaseLayout} from "./BaseLayout"
import type {BaseLayoutProps} from "./BaseLayout"

interface Props extends BaseLayoutProps {
  title: string
}

export const PostLayout: FC<Props> = ({title, children}) => (
  <BaseLayout title={title}>
    <EditPostHeader />

    <article className="flex flex-1 flex-col">
      {children}
    </article>
  </BaseLayout>
)
