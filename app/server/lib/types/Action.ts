import type {
  ActionFunctionArgs,
  unstable_RouterContextProvider as RouterContextProvider
} from "react-router"

import type {Replace} from "./Replace.ts"

export type ActionArgs = Replace<
  ActionFunctionArgs,
  {
    context: RouterContextProvider
    params: any // Fixup for loader params incompatibility. But fear not: this type will be inferred as expected in-place
  }
>

export type Action<TResult, TArgs extends ActionArgs> = (
  args: TArgs
) => Promise<TResult>
