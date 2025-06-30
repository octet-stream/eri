import type {FC, ReactNode} from "react"

interface PostEditorFieldset {
  children?: ReactNode
}

export const PostEditorFieldset: FC<PostEditorFieldset> = ({children}) => (
  <div className="h-full">{children}</div>
)
