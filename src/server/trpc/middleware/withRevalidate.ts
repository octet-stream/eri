import {middleware} from "server/trpc/def"

import {revalidate} from "server/lib/util/revalidate"

/**
 * Adds `revalidate` function to the context
 */
export const withRevalidate = middleware(({ctx, next}) => {
  function revalidateCaches(path: string) {
    revalidate(path)
  }

  return next({ctx: {...ctx, revalidate: revalidateCaches}})
})
