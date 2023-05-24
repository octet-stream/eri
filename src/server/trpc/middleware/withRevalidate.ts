import {middleware} from "server/trpc/def"

import {legacyRevalidate} from "server/lib/util/legacyRevalidate"

/**
 * Adds `revalidate` function to the context
 */
export const withRevalidate = middleware(({ctx, next}) => {
  async function revalidateCaches(path: `/${string}`) {
    // TODO: Replace legacyRevalidate when `revalidatePath` API is fixed.
    await legacyRevalidate(path)
  }

  return next({ctx: {...ctx, revalidate: revalidateCaches}})
})
