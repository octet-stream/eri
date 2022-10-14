import type {FC, ReactNode} from "react"

import {PostNewHeader} from "component/Header/PostNewHeader"

import {EditorLayout} from "./EditorLayout"

interface Props {
  children: ReactNode
}

export const PostNewLayout: FC<Props> = ({children}) => (
  <EditorLayout header={<PostNewHeader />}>
    {children}
  </EditorLayout>
)
