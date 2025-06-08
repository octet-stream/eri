import type {FC} from "react"

import {useCurrentEditor, useEditorState} from "@tiptap/react"
import {BubbleMenu} from "@tiptap/react/menus"
import {
  Bold,
  Code,
  Italic,
  Strikethrough,
  Subscript,
  Superscript
} from "lucide-react"
import {useEvent} from "react-use-event-hook"

import {ToolbarButton} from "./ToolbarButton.jsx"

export const EditorBubbleMenu: FC = () => {
  const {editor} = useCurrentEditor()

  const state = useEditorState({
    editor,
    selector: ctx => ({
      bold: ctx.editor?.isActive("bold"),
      italic: ctx.editor?.isActive("italic"),
      strikethrough: ctx.editor?.isActive("strike"),
      subscript: ctx.editor?.isActive("subscript"),
      superscript: ctx.editor?.isActive("superscript"),
      code: ctx.editor?.isActive("code")
    })
  })

  const toggleBold = useEvent(() => {
    editor?.chain().focus().toggleBold().run()
  })

  const toggleItalic = useEvent(() => {
    editor?.chain().focus().toggleItalic().run()
  })

  const toggleStrikethrough = useEvent(() => {
    editor?.chain().focus().toggleStrike().run()
  })

  const toggleSubscript = useEvent(() => {
    editor?.chain().focus().toggleSubscript().run()
  })

  const toggleSuperscript = useEvent(() => {
    editor?.chain().focus().toggleSuperscript().run()
  })

  const toggleCode = useEvent(() => {
    editor?.chain().focus().toggleCode().run()
  })

  return editor ? (
    <BubbleMenu
      editor={editor}
      options={{placement: "top", offset: 8}}
      shouldShow={null}
    >
      <div
        role="toolbar"
        className="select-none flex flex-row gap-1 items-center rounded-md bg-popover shadow-md border p-1 print:hidden"
      >
        <ToolbarButton active={state?.bold} onClick={toggleBold}>
          <Bold size={16} />
        </ToolbarButton>
        <ToolbarButton active={state?.italic} onClick={toggleItalic}>
          <Italic size={16} />
        </ToolbarButton>

        <ToolbarButton
          active={state?.strikethrough}
          onClick={toggleStrikethrough}
        >
          <Strikethrough size={16} />
        </ToolbarButton>

        <ToolbarButton active={state?.subscript} onClick={toggleSubscript}>
          <Subscript size={16} />
        </ToolbarButton>

        <ToolbarButton active={state?.superscript} onClick={toggleSuperscript}>
          <Superscript size={16} />
        </ToolbarButton>

        <ToolbarButton active={state?.code} onClick={toggleCode}>
          <Code size={16} />
        </ToolbarButton>
      </div>
    </BubbleMenu>
  ) : null
}
