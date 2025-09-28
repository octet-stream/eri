import {useEditorState} from "@tiptap/react"
import {BubbleMenu} from "@tiptap/react/menus"
import {
  Bold,
  Code,
  Italic,
  Strikethrough,
  Subscript,
  Superscript
} from "lucide-react"
import type {FC} from "react"
import {useEvent} from "react-use-event-hook"

import {useEditorContext} from "./EditorContext.jsx"
import {EditorToolbarButton} from "./EditorToolbarButton.jsx"

export const EditorBubbleMenu: FC = () => {
  const editor = useEditorContext()

  const state = useEditorState({
    editor,
    selector: ctx => ({
      bold: ctx.editor.isActive("bold"),
      italic: ctx.editor.isActive("italic"),
      strikethrough: ctx.editor.isActive("strike"),
      subscript: ctx.editor.isActive("subscript"),
      superscript: ctx.editor.isActive("superscript"),
      code: ctx.editor.isActive("code")
    })
  })

  const toggleBold = useEvent(() => {
    editor.chain().focus().toggleBold().run()
  })

  const toggleItalic = useEvent(() => {
    editor.chain().focus().toggleItalic().run()
  })

  const toggleStrikethrough = useEvent(() => {
    editor.chain().focus().toggleStrike().run()
  })

  const toggleSubscript = useEvent(() => {
    editor.chain().focus().toggleSubscript().run()
  })

  const toggleSuperscript = useEvent(() => {
    editor.chain().focus().toggleSuperscript().run()
  })

  const toggleCode = useEvent(() => {
    editor.chain().focus().toggleCode().run()
  })

  return (
    <BubbleMenu
      editor={editor}
      options={{placement: "top", offset: 8}}
      shouldShow={null}
    >
      <div
        role="toolbar"
        className="select-none flex flex-row gap-1 items-center rounded-md bg-popover shadow-md border p-1 print:hidden"
      >
        <EditorToolbarButton active={state?.bold} onClick={toggleBold}>
          <Bold size={16} />
        </EditorToolbarButton>
        <EditorToolbarButton active={state?.italic} onClick={toggleItalic}>
          <Italic size={16} />
        </EditorToolbarButton>

        <EditorToolbarButton
          active={state?.strikethrough}
          onClick={toggleStrikethrough}
        >
          <Strikethrough size={16} />
        </EditorToolbarButton>

        <EditorToolbarButton
          active={state?.subscript}
          onClick={toggleSubscript}
        >
          <Subscript size={16} />
        </EditorToolbarButton>

        <EditorToolbarButton
          active={state?.superscript}
          onClick={toggleSuperscript}
        >
          <Superscript size={16} />
        </EditorToolbarButton>

        <EditorToolbarButton active={state?.code} onClick={toggleCode}>
          <Code size={16} />
        </EditorToolbarButton>
      </div>
    </BubbleMenu>
  )
}
