import {Fragment, type FC} from "react"
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

import {TurnIntoDropdownMenu} from "./TurnIntoDropdownMenu.jsx"
import {InsertDropdownMenu} from "./InsertDropdownMenu.jsx"
import {MarkToolbarButton} from "./MarkToolbarButton.jsx"
// import {ModeDropdownMenu} from "./mode-dropdown-menu.jsx"
import {ToolbarGroup} from "./Toolbar.jsx"

export const FixedToolbarButtons: FC = () => {
  const readOnly = useEditorReadOnly()

  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex flex-wrap"
        style={{
          transform: "translateX(calc(-1px))"
        }}
      >
        {!readOnly && (
          <Fragment>
            <ToolbarGroup noSeparator>
              <InsertDropdownMenu />
              <TurnIntoDropdownMenu />
            </ToolbarGroup>

            <ToolbarGroup>
              <MarkToolbarButton tooltip="Bold (⌘+B)" nodeType={MARK_BOLD}>
                <Bold />
              </MarkToolbarButton>
              <MarkToolbarButton tooltip="Italic (⌘+I)" nodeType={MARK_ITALIC}>
                <Italic />
              </MarkToolbarButton>
              <MarkToolbarButton
                tooltip="Underline (⌘+U)"
                nodeType={MARK_UNDERLINE}
              >
                <Underline />
              </MarkToolbarButton>

              <MarkToolbarButton
                tooltip="Strikethrough (⌘+⇧+M)"
                nodeType={MARK_STRIKETHROUGH}
              >
                <Strikethrough />
              </MarkToolbarButton>
              <MarkToolbarButton tooltip="Code (⌘+E)" nodeType={MARK_CODE}>
                <Code />
              </MarkToolbarButton>
            </ToolbarGroup>
          </Fragment>
        )}

        <div className="grow" />

        {/* <ToolbarGroup noSeparator>
          <ModeDropdownMenu />
        </ToolbarGroup> */}
      </div>
    </div>
  )
}
