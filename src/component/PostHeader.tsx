import type {FC} from "react"

import Link from "next/link"

import {Header} from "./Header"
import {Nav} from "./Nav"

export const PostHeader: FC = () => (
  <Header>
    <Nav>
      <Link href="/">
        <a className="no-underline">
          ← Back to posts
        </a>
      </Link>
    </Nav>
  </Header>
)