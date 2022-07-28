import {DotsVerticalIcon} from "@heroicons/react/solid"
import {Menu} from "@headlessui/react"
import type {FC} from "react"

import {FlyoutMenuItem} from "./FlyoutMenuItem"
import {FlyoutMenuFooter} from "./FlyoutMenuFooter"

interface Props { }

export const FlyoutMenu: FC<Props> = () => (
  <nav className="relative">
    <Menu>
      <Menu.Button className="flex flex-row justify-center items-center">
        <DotsVerticalIcon className="w-5 h-5 cursor-pointer" />
      </Menu.Button>

      <Menu.Items className="absolute bg-white right-0 rounded-md drop-shadow-md overflow-hidden mt-2 w-[220px]">
        <FlyoutMenuItem>
          Foo
        </FlyoutMenuItem>

        <FlyoutMenuItem>
          Bar
        </FlyoutMenuItem>

        <FlyoutMenuItem>
          Boo
        </FlyoutMenuItem>

        <FlyoutMenuFooter />
      </Menu.Items>
    </Menu>
  </nav>
)
