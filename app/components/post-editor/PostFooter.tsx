import type {FC, ReactNode} from "react"

export interface PostFooterProps {
  children: ReactNode
}

export const PostFooter: FC<PostFooterProps> = ({children}) => (
  <div className="flex justify-end">
    {children}
  </div>
)
