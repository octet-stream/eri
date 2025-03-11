import type {
  ActionFunctionArgs,
  unstable_RouterContextProvider as RouterContextProvider
} from "react-router"

import type {Replace} from "./Replace.js"

export type ActionArgs = Replace<
  ActionFunctionArgs,
  {
    context: RouterContextProvider
  }
>

export type Action<TResult, TArgs extends ActionArgs> = (
  args: TArgs
) => Promise<TResult>
