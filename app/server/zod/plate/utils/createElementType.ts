import {z} from "zod"

import {WithId} from "../common/WithId.js"

export const createElementType = <
  TType extends string,
  TChildren extends z.ZodTypeAny,
  TChildrenCardinality extends z.ArrayCardinality = "many"
>(
  element: z.ZodLiteral<TType>,
  children: z.ZodArray<TChildren, TChildrenCardinality>
) => z.object({...WithId.shape, type: element, children})
