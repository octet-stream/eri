import {FC} from "react"

import Link from "next/link"

import s from "./nav.module.css"

const Nav: FC = () => (
  <nav className={s.container}>
    <Link href="/">
      <a className={s.element}>Home</a>
    </Link>

    <Link href="/tags">
      <a className={s.element}>Tags</a>
    </Link>
  </nav>
)

export default Nav
