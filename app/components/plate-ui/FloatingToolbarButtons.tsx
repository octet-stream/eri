import {Fragment, FC} from "react"
import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE
} from "@udecode/plate-basic-marks"
import {useEditorReadOnly} from "@udecode/plate-common"
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code
} from "lucide-react"

import {MoreDropdownMenu} from "./MoreDropdownMenu.jsx"
import {MarkToolbarButton} from "./MarkToolbarButton.jsx"
import {TurnIntoDropdownMenu} from "./TurnIntoDropdownMenu.jsx"

export const FloatingToolbarButtons: FC = () => {
  const readOnly = useEditorReadOnly()

  return (
    <Fragment>
      {!readOnly && (
        <Fragment>
          <TurnIntoDropdownMenu />

          <MarkToolbarButton nodeType={MARK_BOLD} tooltip="Bold (⌘+B)">
            <Bold />
          </MarkToolbarButton>
          <MarkToolbarButton nodeType={MARK_ITALIC} tooltip="Italic (⌘+I)">
            <Italic />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={MARK_UNDERLINE}
            tooltip="Underline (⌘+U)"
          >
            <Underline />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={MARK_STRIKETHROUGH}
            tooltip="Strikethrough (⌘+⇧+M)"
          >
            <Strikethrough />
          </MarkToolbarButton>
          <MarkToolbarButton nodeType={MARK_CODE} tooltip="Code (⌘+E)">
            <Code />
          </MarkToolbarButton>
        </Fragment>
      )}

      <MoreDropdownMenu />
    </Fragment>
  )
}
