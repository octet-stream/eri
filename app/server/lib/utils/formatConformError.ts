import type {SubmissionResult} from "@conform-to/react"
import type {z} from "zod"

/**
 * Formats Zod flattened `error` object to Conform error format
 *
 * See: https://github.com/edmundhung/conform/blob/bfb5751394789389be6bf08109f24951cd064843/packages/conform-dom/submission.ts#L272-L278
 */
export const formatConformError = <T, U = string>(
  error: Partial<z.core.$ZodFlattenedError<T, U>>
): SubmissionResult<U[]> => ({
  status: "error",
  error: {
    ...(error.fieldErrors ?? {}),
    "": error.formErrors ?? null
  }
})
