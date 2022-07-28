import {useSession} from "next-auth/react"
import {Menu} from "@headlessui/react"
import type {FC} from "react"

import Link from "next/link"

interface Props { }

// TODO: Refactor this to separate components
// TODO: Add logout action using `signOut` from `next-auth/rect`
export const FlyoutMenuFooter: FC<Props> = () => {
  const {status} = useSession()

  return (
    <div className="bg-slate-100 flex flex-row">
      <Menu.Item>
        {status === "authenticated" ? (
          <div className="px-6 py-2 flex-1">
            <Link href="/">
              <a className="no-underline">
                Log out
              </a>
            </Link>
          </div>
        ) : (
          <div className="px-6 py-2 flex-1">
            <Link href="/auth/login">
              <a className="no-underline">
                Log in
              </a>
            </Link>
          </div>
        )}
      </Menu.Item>
    </div>
  )
}
