import type {PlateRenderLeafProps} from "@udecode/plate-core"
import type {FC, ReactNode} from "react"

import type {OInlineCode} from "server/trpc/type/common/EditorData"
import type {Value} from "lib/type/Editor"

import {InlineCode} from "component/InlineCode"

interface Props extends PlateRenderLeafProps<Value, OInlineCode> {
  children: ReactNode
}

export const Code: FC<Props> = ({attributes, children}) => (
  <InlineCode {...attributes}>
    {children}
  </InlineCode>
)
