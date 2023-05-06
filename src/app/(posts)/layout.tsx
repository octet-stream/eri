import type {FC, ReactNode} from "react"

interface Props {
  children: ReactNode
}

const PostLayout: FC<Props> = ({children}) => (
  <div className="prose dark:prose-invert py-5 laptop:p-5 mx-auto flex flex-1 flex-col dark:text-white">
    {children}
  </div>
)

export default PostLayout
