import type {TRenderElementProps} from "@udecode/plate-core"
import type {FC, ReactNode} from "react"

import type {TParagraph} from "server/trpc/type/common/EditorData"
import type {Value} from "lib/type/Editor"

interface Props extends TRenderElementProps<Value, TParagraph> {
  children: ReactNode
}

export const Paragraph: FC<Props> = ({attributes, element, children}) => (
  <p {...attributes} className="m-0 py-1" style={{textAlign: element.align}}>
    {children}
  </p>
)
