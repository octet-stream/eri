import Link from "next/link"

import {container, element} from "./nav.module.css"

/** @type {React.FC} */
const Nav = () => (
  <nav className={container}>
    <Link href="/">
      <a className={element}>Home</a>
    </Link>
    <Link href="/tags">
      <a className={element}>Tags</a>
    </Link>
  </nav>
)

export default Nav
