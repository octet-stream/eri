import type {FC, ReactNode} from "react"

import {Nav} from "./Nav"

interface Props {
  children?: ReactNode
}

export const Header: FC<Props> = ({children}) => (
  <header className="w-full flex pb-5">
    {children}

    <div className="flex-1" />

    <Nav className="flex flex-row">
      <div>
        Menu
      </div>
    </Nav>
  </header>
)
