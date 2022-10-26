import type {FC} from "react"

import {
  FloatingLink,
  LaunchIcon,
  LinkIcon,
  LinkOffIcon,
  ShortTextIcon,

  useFloatingLinkSelectors,
} from "@udecode/plate-link"

export const FloatingLink: FC = () => {
  const isEditing = useFloatingLinkSelectors().isEditing()

  return (
    <div>Foo</div>
  )
}
