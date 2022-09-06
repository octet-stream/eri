import type {TDescendant, TElement, TText} from "@udecode/plate"
import type {ZodType, infer as Infer} from "zod"
import {z} from "zod"

import isEditorContentEmpty from "lib/util/isEditorContentEmpty"

export const Text: ZodType<TText> = z.lazy(() => z.object({
  text: z.string()
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
