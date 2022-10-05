import type {FC, ReactNode, ReactElement} from "react"

interface Props {
  menu?: ReactElement<any, any> | false | null
  children?: ReactNode
}

export const Header: FC<Props> = ({menu, children}) => (
  <header className="w-full flex pb-5">
    {children}

    <div className="flex-1" />

    {menu}
  </header>
)
