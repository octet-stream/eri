import {forwardRef, ComponentPropsWithoutRef} from "react"

type AnchorProps = ComponentPropsWithoutRef<"a">

const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>((props, ref) => (
  <a {...props} ref={ref} />
))

export default Anchor
