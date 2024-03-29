import {z} from "zod"

export const createEditorType = <T extends z.ZodTypeAny>(
  children: z.ZodArray<T>
) => z.object({children})
