/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
import {signOut} from "next-auth/react"
import {toast} from "react-hot-toast"
import {forwardRef} from "react"

interface Props { }

export const FlyoutMenuLogout = forwardRef<HTMLButtonElement, Props>(
  (_, ref) => {
    const onClickLogOut = () => signOut().catch(() => {
      toast.error("Can't perform this operation")
    })

    return (
      <button
        ref={ref}
        type="button"
        className="px-6 py-2 flex-1 text-left"
        onClick={onClickLogOut}
      >
        Log out
      </button>
    )
  }
)
