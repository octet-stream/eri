import {z} from "zod"

import {Paragraph} from "../common/Paragraph.js"

export const PostContentEditorDescendant = z
  .array(z.object(Paragraph.shape)) // TODO: Add more element for root descendant

export type IPostContentEditorDescendant = z.input<
  typeof PostContentEditorDescendant
>

export type OPostContentEditorDescendant = z.output<
  typeof PostContentEditorDescendant
>
