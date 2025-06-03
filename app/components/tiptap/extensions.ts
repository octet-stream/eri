// Basic
import {Document} from "@tiptap/extension-document"
import {Paragraph} from "@tiptap/extension-paragraph"
import {Text} from "@tiptap/extension-text"
import {Placeholder} from "@tiptap/extensions"

// Menus
import {BubbleMenu} from "@tiptap/extension-bubble-menu"

// Blocks
import {Heading} from "@tiptap/extension-heading"

// Marks
import {Bold} from "@tiptap/extension-bold"
import {Code} from "@tiptap/extension-code"
import {Italic} from "@tiptap/extension-italic"
import {Link} from "@tiptap/extension-link"
import {Strike} from "@tiptap/extension-strike"
import {Subscript} from "@tiptap/extension-subscript"
import {Superscript} from "@tiptap/extension-superscript"

export const PostDocument = Document.extend({
  content: "heading block*"
})

export const extensions = [
  PostDocument,
  Paragraph,
  Text,
  Placeholder.configure({placeholder: "Write something..."}),

  BubbleMenu,

  Heading,

  Bold,
  Italic,
  Strike,
  Subscript,
  Superscript,
  Code,
  Link
]
