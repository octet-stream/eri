import {z} from "zod"

export const RichTextSubscript = z.object({
  subscript: z.literal(true)
})

export type IRichTextSubscript = z.input<typeof RichTextSubscript>

export type ORichTextSubscript = z.output<typeof RichTextSubscript>
