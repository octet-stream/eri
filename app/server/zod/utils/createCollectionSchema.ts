import {Collection} from "@mikro-orm/mysql"
import {z} from "zod"

/**
 * Creates `Collection` zod schema for given `schema` parameter
 */
export const createCollectionSchema = <T extends z.ZodRawShape>(
  schema: z.ZodObject<T>
) => z
  .instanceof(Collection)
  .transform(async (value, ctx) => {
    const result = await z.array(schema).safeParseAsync(value.toArray())

    if (result.success) {
      return result.data
    }

    for (const error of result.error.errors) {
      ctx.addIssue(error)
    }
  })
