import type {FC} from "react"

import {FlyoutMenuItem} from "component/FlyoutMenu"

interface Props {
  slug: string
}

export const EditPostFragment: FC<Props> = ({slug}) => (
  <FlyoutMenuItem href={`/post/${slug}/edit`}>
    Edit post
  </FlyoutMenuItem>
)
