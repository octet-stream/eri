import {DotsVerticalIcon} from "@heroicons/react/solid"

import type {FC, ReactNode} from "react"

interface Props {
  children?: ReactNode
}

export const Header: FC<Props> = ({children}) => (
  <header className="w-full flex pb-5">
    {children}

    <div className="flex-1" />

    <div className="flex flex-row justify-center items-center">
      <DotsVerticalIcon className="w-5 h-5 cursor-pointer" />
    </div>
  </header>
)
