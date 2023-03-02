import type {TRenderElementProps} from "@udecode/plate-core"
import type {FC, ReactNode} from "react"

import type {TBlockquote} from "server/trpc/type/common/EditorData"
import type {Value} from "lib/type/Editor"

interface Props extends TRenderElementProps<Value, TBlockquote> {
  children: ReactNode
}

export const Blockquote: FC<Props> = ({attributes, children}) => (
  <blockquote {...attributes}>
    {children}
  </blockquote>
)
