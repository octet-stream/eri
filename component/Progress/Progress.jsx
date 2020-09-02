import {useNProgress} from "@tanem/react-nprogress"

import t from "prop-types"

import Container from "./Container"
import Bar from "./Bar"

function Progress({
  animationDuration,
  incrementDuration,
  isAnimating,
  minimum
}) {
  const {isFinished, progress} = useNProgress({
    animationDuration,
    incrementDuration,
    isAnimating,
    minimum
  })

  return (
    <Container isFinished={isFinished} duration={animationDuration}>
      <Bar duration={animationDuration} progress={progress} />
    </Container>
  )
}

Progress.propTypes = {
  animationDuration: t.number,
  incrementDuration: t.number,
  isAnimating: t.bool,
  minimum: t.number
}

Progress.defaultProps = {
  animationDuration: 200,
  incrementDuration: 800,
  isAnimating: false,
  minimum: 0.08
}

export default Progress
