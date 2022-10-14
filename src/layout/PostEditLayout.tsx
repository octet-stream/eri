import type {FC, ReactNode} from "react"

import {PostEditHeader} from "component/Header/PostEditHeader"

import {EditorLayout} from "./EditorLayout"

interface Props {
  children: ReactNode
}

export const PostEditLayout: FC<Props> = ({children}) => (
  <EditorLayout header={<PostEditHeader />}>
    {children}
  </EditorLayout>
)
