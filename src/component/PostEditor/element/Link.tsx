import type {TRenderElementProps} from "@udecode/plate-core"
import type {FC} from "react"

import {Anchor} from "component/Anchor"

import type {ILink} from "server/trpc/type/common/EditorData"
import type {Value} from "lib/type/Editor"

interface Props extends TRenderElementProps<Value, ILink> { }

export const Link: FC<Props> = ({attributes, element, children}) => (
  <Anchor {...attributes} href={element.url}>
    {children}
  </Anchor>
)
