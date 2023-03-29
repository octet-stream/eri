import {useRouter} from "next/router"
import type {FC} from "react"

import {FlyoutMenuItem} from "./FlyoutMenuItem"

export const FlyoutMenuLogin: FC = () => {
  const {asPath} = useRouter()

  return (
    <FlyoutMenuItem href={`/auth/login?r=${encodeURIComponent(asPath)}`}>
      Log in
    </FlyoutMenuItem>
  )
}
