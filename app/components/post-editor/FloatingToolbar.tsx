import {useCurrentEditor, useEditorState} from "@tiptap/react"
import {FloatingMenu} from "@tiptap/react/menus"
import {type FC, useMemo} from "react"
import {useEvent} from "react-use-event-hook"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/Select.jsx"

export const FloatingToolbar: FC = () => {
  const {editor} = useCurrentEditor()

  const state = useEditorState({
    editor,
    selector: ctx => ({
      selected: ctx.editor?.state.selection.$head.parent
    })
  })

  const selected = useMemo(() => {
    if (state?.selected?.type.name === "heading") {
      return `h${state.selected.attrs.level}`
    }

    return "p"
  }, [state?.selected])

  const changeNode = useEvent(value => {
    if (!editor) {
      return
    }

    if (/^h[1-4]$/.test(value)) {
      return void editor
        .chain()
        .focus()
        .toggleHeading({level: +value.slice(1) as any})
        .run()
    }

    editor.chain().focus().setParagraph().run()
  })

  return editor ? (
    <FloatingMenu
      shouldShow={null}
      editor={editor}
      className="select-none rounded-md bg-popover shadow-md print:hidden relative"
    >
      {/* Use key property so the list will reflect current node type */}
      <Select key={selected} onValueChange={changeNode} defaultValue={selected}>
        <SelectTrigger>
          <SelectValue placeholder="Text" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="p">Text</SelectItem>

          <SelectItem value="h1">Heading 1</SelectItem>

          <SelectItem value="h2">Heading 2</SelectItem>

          <SelectItem value="h3">Heading 3</SelectItem>

          <SelectItem value="h4">Heading 4</SelectItem>
        </SelectContent>
      </Select>
    </FloatingMenu>
  ) : null
}
