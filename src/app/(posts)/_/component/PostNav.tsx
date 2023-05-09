import type {FC} from "react"

import Link from "next/link"

export const PostNav: FC = () => (
  <nav>
    <Link href="/" className="no-underline">
      Up
    </Link>
  </nav>
)
