import {forwardRef} from "react"

/** @type {React.FC<React.HTMLAttributes<HTMLAnchorElement>>} */
const Anchor = forwardRef(({children, ...props}, ref) => (
  <a {...props} ref={ref}>
    {children}
  </a>
))

export default Anchor
