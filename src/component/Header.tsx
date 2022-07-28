import type {FC, ReactNode} from "react"

import {FlyoutMenu} from "component/FlyoutMenu"

interface Props {
  children?: ReactNode
}

export const Header: FC<Props> = ({children}) => (
  <header className="w-full flex pb-5">
    {children}

    <div className="flex-1" />

    <FlyoutMenu />
  </header>
)
