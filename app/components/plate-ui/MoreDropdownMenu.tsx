import {focusEditor, toggleMark, useEditorRef} from "@udecode/plate-common"
import {MARK_SUBSCRIPT, MARK_SUPERSCRIPT} from "@udecode/plate-basic-marks"
import type {DropdownMenuProps} from "@radix-ui/react-dropdown-menu"
import type {FC} from "react"
import {MoreHorizontal, Superscript, Subscript} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useOpenState
} from "./DropdownMenu.jsx"
import {ToolbarButton} from "./Toolbar.jsx"

export const MoreDropdownMenu: FC<DropdownMenuProps> = props => {
  const editor = useEditorRef()
  const openState = useOpenState()

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="Insert">
          <MoreHorizontal />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="flex max-h-[500px] min-w-[180px] flex-col gap-0.5 overflow-y-auto"
      >
        <DropdownMenuItem
          onSelect={() => {
            toggleMark(editor, {
              key: MARK_SUBSCRIPT,
              clear: MARK_SUPERSCRIPT
            })
            focusEditor(editor)
          }}
        >
          <Superscript className="mr-2 size-5" />
          Superscript
          {/* (⌘+,) */}
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            toggleMark(editor, {
              key: MARK_SUPERSCRIPT,
              clear: MARK_SUBSCRIPT
            })
            focusEditor(editor)
          }}
        >
          <Subscript className="mr-2 size-5" />
          Subscript
          {/* (⌘+.) */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
