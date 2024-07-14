import {PlateElement, withRef} from "@udecode/plate-common"

import {Paragraph} from "../common/Paragraph.jsx"

export const ParagraphElement = withRef<typeof PlateElement>(
  ({children, ...props}, ref) => (
    <PlateElement {...props} ref={ref} asChild>
      <Paragraph>
        {children}
      </Paragraph>
    </PlateElement>
  )
)
