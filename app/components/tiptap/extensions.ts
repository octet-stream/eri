import {Document} from "@tiptap/extension-document"
import {Text} from "@tiptap/extension-text"
import {Placeholder} from "@tiptap/extensions"

import {BubbleMenu} from "@tiptap/extension-bubble-menu"

import {Bold} from "@tiptap/extension-bold"
import {Italic} from "@tiptap/extension-italic"
import {Link} from "@tiptap/extension-link"
import {Strike} from "@tiptap/extension-strike"
import {Subscript} from "@tiptap/extension-subscript"
import {Superscript} from "@tiptap/extension-superscript"

import {Blockquote} from "./extensions/Blockquote.jsx"
import {Heading} from "./extensions/Heading.jsx"
import {Paragraph} from "./extensions/Paragraph.jsx"

import type {AnyExtension} from "@tiptap/core"
import {InlineCode} from "./extensions/InlineCode.jsx"

export const PostDocument = Document.extend({
  content: "heading block*"
})

export const extensions: AnyExtension[] = [
  // Misc
  PostDocument,
  Text,
  Placeholder.configure({placeholder: "Write something..."}),

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
  Link,

  // Functional
  BubbleMenu
]
