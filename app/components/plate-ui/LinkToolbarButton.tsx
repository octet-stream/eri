import {withRef} from "@udecode/cn"
import {
  useLinkToolbarButton,
  useLinkToolbarButtonState
} from "@udecode/plate-link"
import {Link2} from "lucide-react"

import {ToolbarButton} from "./Toolbar.jsx"

export const LinkToolbarButton = withRef<typeof ToolbarButton>((rest, ref) => {
  const state = useLinkToolbarButtonState()
  const {props} = useLinkToolbarButton(state)

  return (
    <ToolbarButton ref={ref} tooltip="Link" {...props} {...rest}>
      <Link2 />
    </ToolbarButton>
  )
})
