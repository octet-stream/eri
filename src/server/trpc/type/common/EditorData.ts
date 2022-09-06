import type {TDescendant, TElement, TText} from "@udecode/plate"
import type {ZodType, infer as Infer} from "zod"
import {ELEMENT_PARAGRAPH} from "@udecode/plate"
import {isEmpty} from "lodash"
import {z} from "zod"

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
    value => {
      if (isEmpty(value)) {
        return false
      }

      if (
        value.length === 1
          && value[0].type === ELEMENT_PARAGRAPH
          && value[0].children.length === 1
          && value[0].children[0].text === ""
      ) {
        return false
      }

      return true
    },

    {
      message: "Post content must be of at least one Node element"
    }
  )

export interface IEditorData extends Infer<typeof EditorData> { }
