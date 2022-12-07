import type {TRenderLeafProps} from "@udecode/plate-core"
import type {FC} from "react"

import type {IRichText} from "server/trpc/type/common/EditorData"
import type {Value} from "lib/type/Editor"

import {InlineCode} from "component/InlineCode"

interface Props extends TRenderLeafProps<Value, IRichText> { }

export const Code: FC<Props> = ({attributes, children}) => (
  <InlineCode {...attributes}>
    {children}
  </InlineCode>
)
