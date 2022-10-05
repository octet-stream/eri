import {useSession} from "next-auth/react"
import type {FC} from "react"

import {FlyoutMenu} from "component/FlyoutMenu"

import {NewPostFragment} from "component/MenuFragments/NewPostFragment"

export const MainMenu: FC = () => {
  const {status} = useSession()

  const isAuthenticated = status === "authenticated"

  return (
    <FlyoutMenu>
      {isAuthenticated && <NewPostFragment />}
    </FlyoutMenu>
  )
}
