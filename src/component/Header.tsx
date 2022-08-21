import type {FC, ReactNode} from "react"

import {FlyoutMenu} from "component/FlyoutMenu"
import {UserMenu} from "component/UserMenu"

interface Props {
  children?: ReactNode
}

export const Header: FC<Props> = ({children}) => (
  <header className="w-full flex pb-5">
    {children}

    <div className="flex-1" />

    <FlyoutMenu>
      <UserMenu />
    </FlyoutMenu>
  </header>
)
