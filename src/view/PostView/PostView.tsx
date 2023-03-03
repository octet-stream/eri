import {Fragment} from "react"
import type {FC} from "react"

import {PostTitle} from "./PostTitle"
import {PostContent} from "./PostContent"
import {PostDetails} from "./PostDetails"

export const PostView: FC = () => (
  <Fragment>
    <PostTitle />

    <PostDetails />

    <PostContent />
  </Fragment>
)
