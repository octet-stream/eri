import t from "prop-types"

import {container, content} from "./bar.module.css"

const Bar = ({progress, duration}) => (
  <div
    className={container}
    style={{
      marginLeft: `${(-1 + progress) * 100}%`,
      transitionDuration: `${duration}ms`
    }}
  >
    <div className={content} />
  </div>
)

Bar.propTypes = {
  progress: t.number.isRequired,
  duration: t.number.isRequired
}

export default Bar
