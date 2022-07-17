import type {OutputData, OutputBlockData} from "@editorjs/editorjs"
import type {ZodType, infer as Infer} from "zod"
import {z} from "zod"

export const EditorBlock: ZodType<OutputBlockData> = z.lazy(() => z.object({
  id: z.string().optional(),
  type: z.string(),
  data: z.record(z.unknown()),
  tunes: z.record(z.unknown())
}))

export const EditorData: ZodType<OutputData> = z.lazy(() => z.object({
  version: z.string().optional(),
  time: z.number().optional(),
  blocks: z.array(EditorBlock)
}))

export interface IEditorData extends Infer<typeof EditorData> {}
