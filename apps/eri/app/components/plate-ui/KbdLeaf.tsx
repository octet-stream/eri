import {PlateLeaf} from "@udecode/plate-common"
import {withRef} from "@udecode/cn"

import {Kbd} from "../common/Kbd.jsx"

export const KbdLeaf = withRef<typeof PlateLeaf>(
  ({children, ...props}, ref) => (
    <PlateLeaf ref={ref} asChild {...props}>
      <Kbd>{children}</Kbd>
    </PlateLeaf>
  )
)
