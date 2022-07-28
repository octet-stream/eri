import type {FC, ReactNode} from "react"
import {Menu} from "@headlessui/react"

import cn from "classnames"

interface Props {
  children?: ReactNode
}

export const FlyoutMenuItem: FC<Props> = ({children}) => (
  <Menu.Item>
    {({active}) => (
      <div className={cn("cursor-pointer px-6 py-2", {"bg-violet-400 text-white": active})}>
        {children}
      </div>
    )}
  </Menu.Item>
)
