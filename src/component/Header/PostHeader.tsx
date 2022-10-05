import type {FC, ReactElement} from "react"

import Link from "next/link"

import {Header} from "component/Header/Header"
import {Nav} from "component/Nav"

interface Props {
  menu: ReactElement<any, any>
}

export const PostHeader: FC<Props> = ({menu}) => (
  <Header menu={menu}>
    <Nav>
      <Link href="/" className="no-underline">
        ← Back to posts
      </Link>
    </Nav>
  </Header>
)
