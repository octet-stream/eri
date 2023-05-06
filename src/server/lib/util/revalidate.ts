import {revalidatePath} from "next/cache"
import {noop} from "lodash"

/**
 * Revalidated cached data associated with given path.
 *
 * Note: This utility replaces `revalidatePath` function from `next/cache` with `_.noop` for AVA tests to prevent unnecessary failures
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/revalidatePath
 */
export const revalidate: typeof revalidatePath
  = process.env.NODE_ENV === "test" && process.env.TEST_RUNNER === "ava"
    ? noop
    : revalidatePath
