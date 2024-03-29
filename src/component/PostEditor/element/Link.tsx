import type {PlateRenderElementProps} from "@udecode/plate-core"
import type {FC, ReactNode} from "react"

import {Anchor} from "component/Anchor"

import type {OLink} from "server/trpc/type/common/EditorData"
import type {Value} from "lib/type/Editor"

interface Props extends PlateRenderElementProps<Value, OLink> {
  children: ReactNode
}

export const Link: FC<Props> = ({attributes, element, children}) => (
  <Anchor {...attributes} href={element.url}>
    {children}
  </Anchor>
)
