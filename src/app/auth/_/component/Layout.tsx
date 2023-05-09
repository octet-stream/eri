import type {FC, ReactNode} from "react"

interface Props {
  children: ReactNode
}

export const Layout: FC<Props> = ({children}) => (
  <div className="flex w-72 m-auto">
    {children}
  </div>
)
