/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {useSession} from "next-auth/react"
import {Menu} from "@headlessui/react"
import {forwardRef} from "react"

import Link from "next/link"

import {FlyoutMenuLogout} from "./FlyoutMenuLogout"

interface Props { }

export const FlyoutMenuFooter = forwardRef<HTMLElement, Props>((_, ref) => {
  const {status} = useSession()

  return (
    <div className="bg-slate-100 flex flex-row">
      <Menu.Item>
        {status === "authenticated" ? (
          <FlyoutMenuLogout ref={ref as any} />
        ) : (
          <Link
            ref={ref as any}
            href="/auth/login"
            className="no-underline px-6 py-2 flex-1 font-normal text-inherit"
          >
            Log in
          </Link>
        )}
      </Menu.Item>
    </div>
  )
})
