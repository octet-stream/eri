import type {FC} from "react"

import {FlyoutMenu, FlyoutMenuItem} from "component/FlyoutMenu"

export const UserMenu: FC = () => (
  <FlyoutMenu>
    <FlyoutMenuItem>
      Foo
    </FlyoutMenuItem>

    <FlyoutMenuItem>
      Bar
    </FlyoutMenuItem>

    <FlyoutMenuItem>
      Boo
    </FlyoutMenuItem>
  </FlyoutMenu>
)
