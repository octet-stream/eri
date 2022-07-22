import type {ToolConstructable, ToolSettings} from "@editorjs/editorjs"

// @ts-expect-error
import Paragraph from "@editorjs/paragraph"

// @ts-expect-error
import Header from "@editorjs/header"

// @ts-expect-error
import InlineCode from "@editorjs/inline-code"

// @ts-expect-error
import Underline from "@editorjs/underline"

// @ts-expect-error
import Code from "@editorjs/code"

// @ts-expect-error
import Embed from "@editorjs/embed"

// @ts-expect-error
import Checklist from "@editorjs/checklist"

// @ts-expect-error
import List from "@editorjs/list"

// @ts-expect-error
import Quote from "@editorjs/quote"

export const tools: Record<string, ToolConstructable | ToolSettings> = {
  paragraph: {
    class: Paragraph
  },
  header: {
    class: Header,
    config: {
      levels: [2, 3, 4]
    }
  },
  inlineCode: {
    class: InlineCode
  },
  underline: Underline,
  list: List,
  checklist: Checklist,
  quote: Quote,
  code: {
    class: Code
  },
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
        vimeo: true,
        imgur: true,
        twitter: true
      }
    }
  }
}
