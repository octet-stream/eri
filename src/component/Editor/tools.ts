import type {ToolConstructable, ToolSettings} from "@editorjs/editorjs"

// @ts-expect-error
import Paragraph from "@editorjs/paragraph"

// @ts-expect-error
import Header from "@editorjs/header"

export const tools: Record<string, ToolConstructable | ToolSettings> = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true
  },
  header: {
    class: Header,
    config: {
      levels: [2, 3, 4]
    }
  }
}
