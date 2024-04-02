import {PlateElement} from "@udecode/plate-common"
import {withRef} from "@udecode/cn"

export const CodeLineElement = withRef<typeof PlateElement>((props, ref) => (
  <PlateElement ref={ref} {...props} />
))
