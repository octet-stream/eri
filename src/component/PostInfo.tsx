import type {FC, ReactNode} from "react"

interface Props {
  children: ReactNode
}

export const PostInfo: FC<Props> = ({children}) => (
  <small className="text-gray-600 select-none">
    {children}
  </small>
)
