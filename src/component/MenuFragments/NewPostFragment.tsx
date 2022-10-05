import type {FC} from "react"

import {FlyoutMenuItem} from "component/FlyoutMenu"

/**
 * User menu items fragment.
 *
 * @example
 *
 * ```tsx
 * import {FlyoutMenu, FlyoutMenuItem} from "component/FlyoutMenu"
 * import {UserMenu} from "component/UserMenu"
 *
 * const MyMenu = () => (
 *   <FlyoutMenu>
 *     <UserMenu />
 *
 *     <FlyoutMenuItem>
 *       My custom menu item
 *     </FlyoutMenuItem>
 *   </FlyoutMenu>
 * )
 * ```
 */
export const NewPostFragment: FC = () => (
  <FlyoutMenuItem href="/new">
    New post
  </FlyoutMenuItem>
)
