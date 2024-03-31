import {z} from "zod"

export const RichTextSuperscript = z.object({
  superscript: z.literal(true)
})

export type IRichTextSuperscript = z.input<typeof RichTextSuperscript>

export type ORichTextSuperscript = z.output<typeof RichTextSuperscript>
