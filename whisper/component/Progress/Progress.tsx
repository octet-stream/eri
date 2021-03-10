import {useNProgress} from "@tanem/react-nprogress"
import {FC} from "react"

import Container from "./Container"
import Bar from "./Bar"

interface NProgressProps {
  animationDuration?: number
  incrementDuration?: number
  isAnimating?: boolean
  minimum?: number
}

const Progress: FC<NProgressProps> = ({
  animationDuration,
  incrementDuration,
  isAnimating,
  minimum
}) => {
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

Progress.defaultProps = {
  animationDuration: 200,
  incrementDuration: 800,
  isAnimating: false,
  minimum: 0 // was 0.08
}

export default Progress
