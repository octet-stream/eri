import type {FC} from "react"

import {useCurrentEditor} from "@tiptap/react"
import {BubbleMenu} from "@tiptap/react/menus"

import {Bold, Italic} from "lucide-react"

export const EditorBubbleMenu: FC = () => {
  const {editor} = useCurrentEditor()

  return editor ? (
    <BubbleMenu
      editor={editor}
      options={{placement: "bottom", offset: 8}}
      shouldShow={null}
    >
      <div
        role="toolbar"
        className="select-none flex items-center rounded-md bg-popover shadow-md border p-1 print:hidden"
      >
        <button type="button">
          <Bold size={16} />
        </button>
        <button type="button">
          <Italic size={16} />
        </button>
      </div>
    </BubbleMenu>
  ) : null
}
