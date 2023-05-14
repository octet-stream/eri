import type {FC, ReactElement} from "react"
import {Fragment} from "react"

import {PostTitle} from "./PostTitle"
import {PostDetails} from "./PostDetails"

interface Props {
  children: ReactElement
}

export const PostView: FC<Props> = ({children}) => (
  <Fragment>
    <PostTitle />

    <PostDetails />

    {children}
  </Fragment>
)
