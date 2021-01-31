import Link from "next/link"

import Nav from "component/Nav"

import {container, gap} from "./header.module.css"

/**
 * @type {React.FC}
 */
const Header = ({nav}) => (
  <header className={container}>
    <Nav />

    <div className={gap} />
  </header>
)

export default Header
