import type {FC, ReactElement} from "react"

import Link from "next/link"

import {Header} from "component/Header/Header"
import {Nav} from "component/Nav"

export interface PostHeaderBaseProps {
  backButtonUrl?: string
  backButtonText?: string
}

interface Props extends PostHeaderBaseProps {
  menu: ReactElement<any, any>
}

export const PostHeader: FC<Props> = ({
  menu,
  backButtonUrl = "/",
  backButtonText = "← Back to list"
}) => (
  <Header menu={menu}>
    <Nav>
      <Link href={backButtonUrl} className="no-underline dark:text-white">
        {backButtonText}
      </Link>
    </Nav>
  </Header>
)
