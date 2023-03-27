import type {PlateRenderElementProps} from "@udecode/plate-core"
import type {FC, ReactNode} from "react"

import type {OParagraph} from "server/trpc/type/common/EditorData"
import type {Value} from "lib/type/Editor"

interface Props extends PlateRenderElementProps<Value, OParagraph> {
  children: ReactNode
}

export const Paragraph: FC<Props> = ({attributes, element, children}) => (
  <p {...attributes} className="m-0 py-1" style={{textAlign: element.align}}>
    {children}
  </p>
)
