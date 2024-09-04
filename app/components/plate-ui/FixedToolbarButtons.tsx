import React from "react"

import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  UnderlinePlugin
} from "@udecode/plate-basic-marks/react"
import {useEditorReadOnly} from "@udecode/plate-common/react"

import {Icons} from "./Icons.jsx"

import {TurnIntoDropdownMenu} from "./TurnIntoDropdownMenu.jsx"
import {InsertDropdownMenu} from "./InsertDropdownMenu.jsx"
import {MarkToolbarButton} from "./MarkToolbarButton.jsx"
import {ToolbarGroup} from "./Toolbar.jsx"

export function FixedToolbarButtons() {
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
          <>
            <ToolbarGroup noSeparator>
              <InsertDropdownMenu />
              <TurnIntoDropdownMenu />
            </ToolbarGroup>

            <ToolbarGroup>
              <MarkToolbarButton nodeType={BoldPlugin.key} tooltip="Bold (⌘+B)">
                <Icons.bold />
              </MarkToolbarButton>
              <MarkToolbarButton
                nodeType={ItalicPlugin.key}
                tooltip="Italic (⌘+I)"
              >
                <Icons.italic />
              </MarkToolbarButton>
              <MarkToolbarButton
                nodeType={UnderlinePlugin.key}
                tooltip="Underline (⌘+U)"
              >
                <Icons.underline />
              </MarkToolbarButton>

              <MarkToolbarButton
                nodeType={StrikethroughPlugin.key}
                tooltip="Strikethrough (⌘+⇧+M)"
              >
                <Icons.strikethrough />
              </MarkToolbarButton>
              <MarkToolbarButton nodeType={CodePlugin.key} tooltip="Code (⌘+E)">
                <Icons.code />
              </MarkToolbarButton>
            </ToolbarGroup>
          </>
        )}
      </div>
    </div>
  )
}
