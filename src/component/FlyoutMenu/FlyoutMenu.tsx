import type {FC, ReactElement, ComponentPropsWithoutRef} from "react"
import {Menu} from "@headlessui/react"

import {MoreVertical} from "lucide-react"

import type {MaybeArray} from "lib/type/MaybeArray"

import {FlyoutMenuItem} from "./FlyoutMenuItem"
import {FlyoutMenuFooter} from "./FlyoutMenuFooter"

// TypeScript does not recognize this as a type even if imported with `import type`, so I made this type alias
type MenuItemType = typeof FlyoutMenuItem

type MenuItemProps = ComponentPropsWithoutRef<MenuItemType>

type MenuElement = MaybeArray<ReactElement<MenuItemProps, MenuItemType>>

interface Props {
  children?: MaybeArray<MenuElement | false | null>
}

export const FlyoutMenu: FC<Props> = ({children}) => (
  <nav className="relative select-none">
    <Menu>
      <Menu.Button className="w-full h-full flex flex-row justify-center items-center cursor-pointer" aria-label="App menu">
        <MoreVertical size={20} />
      </Menu.Button>

      <div className="absolute pointer-events-none device-touch:fixed right-0 device-touch:bottom-0 device-touch:left-0 device-touch:right-0 mt-2 device-touch:m-0 device-touch:p-5 device-touch:w-full w-[220px] z-10">
        <Menu.Items className="w-full bg-white rounded-md drop-shadow-md overflow-hidden">
          {children}

          <FlyoutMenuFooter />
        </Menu.Items>
      </div>
    </Menu>
  </nav>
)
