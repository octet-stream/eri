import type {FC, ReactElement, ComponentPropsWithoutRef} from "react"
import {DotsVerticalIcon} from "@heroicons/react/solid"
import {Menu} from "@headlessui/react"

import type {MaybeArray} from "lib/type/MaybeArray"

import {FlyoutMenuItem} from "./FlyoutMenuItem"
import {FlyoutMenuFooter} from "./FlyoutMenuFooter"

// TypeScript does not recognize this as a type even if imported with `import type`, so I made this type alias
type MenuItemType = typeof FlyoutMenuItem

type MenuItemProps = ComponentPropsWithoutRef<MenuItemType>

interface Props {
  children?: MaybeArray<ReactElement<MenuItemProps, MenuItemType>>
}

export const FlyoutMenu: FC<Props> = ({children}) => (
  <nav className="relative select-none">
    <Menu>
      <Menu.Button className="w-full h-full flex flex-row justify-center items-center">
        <DotsVerticalIcon className="w-5 h-5 cursor-pointer" />
      </Menu.Button>

      <Menu.Items className="absolute bg-white right-0 rounded-md drop-shadow-md overflow-hidden mt-2 w-[220px]">
        {children}

        <FlyoutMenuFooter />
      </Menu.Items>
    </Menu>
  </nav>
)
