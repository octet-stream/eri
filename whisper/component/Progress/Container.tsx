import {FC} from "react"

interface ContainerProps {
  duration: number
  isFinished: boolean
}

const Container: FC<ContainerProps> = ({isFinished, duration, children}) => (
  <div
    style={{
      opacity: isFinished ? 0 : 1,
      transition: `opacity ${duration}ms linear`,
      pointerEvents: "none"
    }}
  >
    {children}
  </div>
)

export default Container
