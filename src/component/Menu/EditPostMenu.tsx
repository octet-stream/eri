import {useSession} from "next-auth/react"
import type {FC} from "react"

import {usePageData} from "lib/hook/usePageData"
import {IPostOutput} from "server/trpc/type/output/PostOutput"

import {FlyoutMenu} from "component/FlyoutMenu"

import {NewPostFragment} from "component/MenuFragments/NewPostFragment"
import {EditPostFragment} from "component/MenuFragments/EditPostFragment"

interface Props { }

export const EditPostMenu: FC<Props> = () => {
  const {slug} = usePageData<IPostOutput>()
  const {status} = useSession()

  const isAuthenticated = status === "authenticated"

  return (
    <FlyoutMenu>
      {isAuthenticated && <EditPostFragment slug={slug} />}

      {isAuthenticated && <NewPostFragment />}
    </FlyoutMenu>
  )
}
