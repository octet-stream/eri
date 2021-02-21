import {FC} from "react"

import s from "./bar.module.css"

interface BarProps {
  progress: number
  duration: number
}

const Bar: FC<BarProps> = ({progress, duration}) => (
  <div
    className={s.container}
    style={{
      marginLeft: `${(-1 + progress) * 100}%`,
      transitionDuration: `${duration}ms`
    }}
  >
    <div className={s.content} />
  </div>
)

export default Bar
