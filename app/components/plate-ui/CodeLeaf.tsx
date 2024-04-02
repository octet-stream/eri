import {PlateLeaf} from "@udecode/plate-common"
import {withRef} from "@udecode/cn"

import {Code} from "../common/Code.jsx"

export const CodeLeaf = withRef<typeof PlateLeaf>(
  ({children, ...props}, ref) => (
    <PlateLeaf
      ref={ref}
      asChild
      {...props}
    >
      <Code>{children}</Code>
    </PlateLeaf>
  )
)
