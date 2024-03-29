import {z} from "zod"

import {WithId} from "../common/WithId.js"

export const createTextType = <
  TText extends z.ZodString | z.ZodLiteral<any>
>(text: TText) => z.object({...WithId.shape, text})
