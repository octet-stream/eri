import type {
  ActionFunctionArgs,
  AppLoadContext,
  LoaderFunctionArgs
} from "react-router"

import type {Replace} from "./Replace.js"

/**
 * Fixes AppLoadContext extension, still broken in RRv7
 */
export type ContextFix<T extends LoaderFunctionArgs | ActionFunctionArgs> =
  Replace<
    T,
    {
      context: AppLoadContext
    }
  >
