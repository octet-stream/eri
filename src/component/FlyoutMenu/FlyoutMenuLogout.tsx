/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
import {signOut} from "next-auth/react"
import {toast} from "react-hot-toast"
import type {FC} from "react"

import {FlyoutMenuItem} from "./FlyoutMenuItem"

export const FlyoutMenuLogout: FC = () => {
  const onClickLogOut = () => signOut().catch(() => {
    toast.error("Can't perform this operation")
  })

  return (
    <FlyoutMenuItem
      className="text-left text-black hover:text-white"
      onClick={onClickLogOut}
    >
      Log out
    </FlyoutMenuItem>
  )
}
