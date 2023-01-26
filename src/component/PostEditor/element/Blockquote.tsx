import type {TRenderElementProps} from "@udecode/plate-core"
import type {FC} from "react"

import type {IBlockquote} from "server/trpc/type/common/EditorData"
import type {Value} from "lib/type/Editor"

interface Props extends TRenderElementProps<Value, IBlockquote> { }

export const Blockquote: FC<Props> = ({attributes, children}) => (
  <blockquote {...attributes} className="dark:text-white">
    {children}
  </blockquote>
)
