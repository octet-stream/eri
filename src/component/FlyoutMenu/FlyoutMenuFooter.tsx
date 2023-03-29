import {useSession} from "next-auth/react"
import type {FC} from "react"

import {FlyoutMenuLogout} from "./FlyoutMenuLogout"

import {FlyoutMenuLogin} from "./FlyoutMenuLogin"

export const FlyoutMenuFooter: FC = () => {
  const {status} = useSession()

  return (
    status === "authenticated" ? <FlyoutMenuLogout /> : <FlyoutMenuLogin />
  )
}
