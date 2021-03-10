import {FC} from "react"

import Nav from "component/Nav"

import s from "./header.module.css"

const Header: FC = () => (
  <header className={s.container}>
    <Nav />

    <div className={s.gap} />
  </header>
)

export default Header
