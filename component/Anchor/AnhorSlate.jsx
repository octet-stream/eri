import {forwardRef} from "react"

import Anchor from "./Anchor"

/** @type {React.FC<React.HTMLAttributes<HTMLAnchorElement>>} */
const AnchorSlate = forwardRef(({link, ...props}, ref) => (
  <Anchor {...props} ref={ref} href={link} />
))

export default AnchorSlate
