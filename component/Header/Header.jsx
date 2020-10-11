import Link from "next/link"

import {container, gap} from "./header.module.css"

/**
 * @type {React.FC}
 */
const Header = () => (
  <header className={container}>
    <Link href="/">
      <a>Home</a>
    </Link>

    <div className={gap} />

    {/* <nav>
      Logout
    </nav> */}
  </header>
)

export default Header
