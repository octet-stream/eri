import {signOut} from "next-auth/react"
import {toast} from "react-hot-toast"
import type {FC} from "react"

interface Props { }

export const FlyoutMenuLogout: FC<Props> = () => {
  const onClickLogOut = () => signOut().catch(() => {
    toast.error("Can't perform this operation")
  })

  return (
    <button
      type="button"
      className="px-6 py-2 flex-1 text-left"
      onClick={onClickLogOut}
    >
      Log out
    </button>
  )
}
