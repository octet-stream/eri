import {getServerSession} from "next-auth/next"
import type {ReactElement} from "react"
import type {Metadata} from "next"

import Link from "next/link"

import {getPosts} from "app/(posts)/_/loader/getPosts"
import type {AFC} from "lib/type/AsyncFunctionComponent"
import {SessionProvider} from "lib/context/SessionContext"
import {options} from "app/api/auth/[...nextauth]/route"
import {PostsDataContextProvider} from "context/PostsDataContext"

interface Props {
  panel: ReactElement
  login: ReactElement
}

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: {
    template: "%s | Admin",
    absolute: "Admin"
  }
}

const AdminRootLayout: AFC<Props> = async ({panel, login}) => {
  const session = await getServerSession(options)

  if (!session) {
    return login
  }

  // TODO: Move this back into @panel/page.tsx if this will be resolved: https://github.com/vercel/next.js/issues/53292
  const posts = await getPosts()

  return (
    <SessionProvider session={session}>
      <div className="flex flex-1 m-5 laptop:mx-0">
        <div className="w-full laptop:w-laptop flex mx-auto">
          <nav className="mr-5">
            <ul>
              <li>
                <Link href="/admin">
                  Posts
                </Link>
              </li>
              <li>
                <Link href="/admin/drafts">
                  Drafts
                </Link>
              </li>
              <li>
                <Link href="/admin/tags">
                  Tags
                </Link>
              </li>
            </ul>
          </nav>

          <div className="border border-gray-800" />

          <article className="ml-5 w-full">
            <PostsDataContextProvider data={posts}>
              {panel}
            </PostsDataContextProvider>
          </article>
        </div>
      </div>
    </SessionProvider>
  )
}

export default AdminRootLayout
