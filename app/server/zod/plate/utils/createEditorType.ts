import {z} from "zod"

export const createEditorType = <
  TChildren extends z.ZodTypeAny,
  TChildrenCardinality extends z.ArrayCardinality = "many"
>(
  children: z.ZodArray<TChildren, TChildrenCardinality>
) => z.object({children})
