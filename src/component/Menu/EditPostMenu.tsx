import {useSession} from "next-auth/react"
import type {FC} from "react"

import {usePostData} from "context/PostDataContext"

import {FlyoutMenu} from "component/FlyoutMenu"

import {NewPostFragment} from "component/MenuFragments/NewPostFragment"
import {EditPostFragment} from "component/MenuFragments/EditPostFragment"

interface Props { }

export const EditPostMenu: FC<Props> = () => {
  const {slug} = usePostData()
  const {status} = useSession()

  const isAuthenticated = status === "authenticated"

  return (
    <FlyoutMenu>
      {isAuthenticated && <EditPostFragment slug={slug} />}

      {isAuthenticated && <NewPostFragment />}
    </FlyoutMenu>
  )
}
