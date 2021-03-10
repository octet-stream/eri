import {FC} from "react"

import s from "./editor.module.css"

const Editor: FC = ({children}) => (
  <div className={s.container}>
    <div className={s.content}>{children}</div>
  </div>
)

export default Editor
