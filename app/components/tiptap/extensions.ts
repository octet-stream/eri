import {Document} from "@tiptap/extension-document"
import {Text} from "@tiptap/extension-text"
import {Placeholder} from "@tiptap/extensions"

import {BubbleMenu} from "@tiptap/extension-bubble-menu"

import {Bold} from "@tiptap/extension-bold"
import {Code} from "@tiptap/extension-code"
import {Italic} from "@tiptap/extension-italic"
import {Link} from "@tiptap/extension-link"
import {Strike} from "@tiptap/extension-strike"
import {Subscript} from "@tiptap/extension-subscript"
import {Superscript} from "@tiptap/extension-superscript"

import {Heading} from "./extensions/Heading.jsx"
import {Paragraph} from "./extensions/Paragraph.jsx"

export const PostDocument = Document.extend({
  content: "heading block*"
})

export const extensions = [
  // Misc
  PostDocument,
  Text,
  Placeholder.configure({placeholder: "Write something..."}),

  // Blocks
  Heading,
  Paragraph,

  // Marks
  Bold,
  Italic,
  Strike,
  Subscript,
  Superscript,
  Code,
  Link,

  // Functional
  BubbleMenu
]
