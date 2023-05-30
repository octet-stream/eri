import type {FC, ReactElement} from "react"

import Link from "next/link"

interface Props {
  children: ReactElement
}

const AdminLayout: FC<Props> = ({children}) => (
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
        {children}
      </article>
    </div>
  </div>
)

export default AdminLayout
