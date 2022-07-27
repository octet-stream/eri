import type {FC, ReactNode} from "react"

interface Props {
  children?: ReactNode
  className?: string
}

export const Nav: FC<Props> = ({children, className}) => (
  <nav className={className}>
    {children}
  </nav>
)
