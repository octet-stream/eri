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
import {Blockquote} from "./extensions/Blockquote.jsx"
import {Heading} from "./extensions/Heading.jsx"
import {InlineCode} from "./extensions/InlineCode.jsx"
import {Paragraph} from "./extensions/Paragraph.jsx"

export const PostDocument = Document.extend({
  content: "heading block*"
})

export const extensions: AnyExtension[] = [
  // Misc
  UndoRedo,
  PostDocument,
  Text,

  // Blocks
  Heading,
  Paragraph,
  Blockquote as any, // FIXME: Figure out why the types are incompatible

  // Marks
  Bold,
  Italic,
  Strike,
  Subscript,
  Superscript,
  InlineCode,
  Link
]
