import type {AnyExtension} from "@tiptap/core"
import {Bold} from "@tiptap/extension-bold"
import {Document} from "@tiptap/extension-document"
import {Italic} from "@tiptap/extension-italic"
import {Link} from "@tiptap/extension-link"
import {Strike} from "@tiptap/extension-strike"
import {Subscript} from "@tiptap/extension-subscript"
import {Superscript} from "@tiptap/extension-superscript"
import {Text} from "@tiptap/extension-text"
import {UndoRedo} from "@tiptap/extensions"
import type {FC} from "react"

import {Editor} from "../../editor/components/Editor.jsx"
import {
  EditorContent,
  type EditorContentProps
} from "../../editor/components/EditorContent.jsx"
import {Blockquote} from "../../editor/extensions/Blockquote.jsx"
import {InlineCode} from "../../editor/extensions/InlineCode.jsx"
import {Paragraph} from "../../editor/extensions/Paragraph.jsx"
import {PostHeading} from "./extensions/PostHeading.jsx"
import {PostTitle} from "./extensions/PostTitle.jsx"

export const PostDocument = Document.extend({
  content: "title block*"
})

export const extensions: AnyExtension[] = [
  // Misc
  UndoRedo,
  PostDocument,
  Text,

  // Blocks
  PostTitle,
  PostHeading,
  Paragraph,
  Blockquote,

  // Marks
  Bold,
  Italic,
  Strike,
  Subscript,
  Superscript,
  InlineCode,
  Link
]

export interface PostEditorProps extends EditorContentProps {}

export const PostEditor: FC<PostEditorProps> = props => (
  <Editor
    extensions={extensions}
    defaultValue={(props as any).defaultValue}
    editorProps={{
      attributes: {
        role: "textbox",
        class:
          "w-full h-0 min-h-full overflow-y-scroll rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      }
    }}
  >
    <EditorContent {...props} containterProps={{className: "h-full"}} />
  </Editor>
)
