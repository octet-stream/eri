import type {TDescendant, TElement, TText} from "@udecode/plate"
import type {ZodType, infer as Infer} from "zod"
import {z} from "zod"

import type {RichText} from "lib/type/Editor"

import isEditorContentEmpty from "lib/util/isEditorContentEmpty"

export const Text: ZodType<RichText> = z.lazy(() => z.object({
  text: z.string(),
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
  underline: z.boolean().optional(),
  strikethrough: z.boolean().optional(),
  kbd: z.boolean().optional(),
  superscript: z.boolean().optional(),
  subscript: z.boolean().optional()
}))

export const Element: ZodType<TElement> = z.lazy(() => z.object({
  type: z.string(),

  // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
  children: z.array(Descendant)
}))

export const Descendant: ZodType<TDescendant> = z.lazy(() => z.union([
  Text, Element
]))

export const EditorData = z
  .array(Element)
  .refine(
    value => isEditorContentEmpty(value) === false,

    {
      message: "Post content must be of at least one Node element"
    }
  )

export interface IEditorData extends Infer<typeof EditorData> { }
