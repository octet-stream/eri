import type {TRenderElementProps} from "@udecode/plate-core"
import type {FC} from "react"

import type {IParagraph} from "server/trpc/type/common/EditorData"
import type {Value} from "lib/type/Editor"

interface Props extends TRenderElementProps<Value, IParagraph> { }

export const Paragraph: FC<Props> = ({attributes, element, children}) => (
  <p {...attributes} className="m-0 py-1" style={{textAlign: element.align}}>
    {children}
  </p>
)
