import t from "prop-types"

const Container = ({isFinished, duration, children}) => (
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

Container.propTypes = {
  duration: t.number.isRequired,
  isFinished: t.bool.isRequired,
  children: t.node.isRequired
}

export default Container
