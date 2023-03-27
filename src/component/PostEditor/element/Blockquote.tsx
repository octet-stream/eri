import type {PlateRenderElementProps} from "@udecode/plate-core"
import type {FC, ReactNode} from "react"

import type {OBlockquote} from "server/trpc/type/common/EditorData"
import type {Value} from "lib/type/Editor"

interface Props extends PlateRenderElementProps<Value, OBlockquote> {
  children: ReactNode
}

export const Blockquote: FC<Props> = ({attributes, children}) => (
  <blockquote {...attributes}>
    {children}
  </blockquote>
)
