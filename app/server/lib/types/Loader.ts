import type {
  LoaderFunctionArgs,
  unstable_RouterContextProvider as RouterContextProvider
} from "react-router"

import type {Replace} from "./Replace.ts"

export type LoaderArgs = Replace<
  LoaderFunctionArgs,
  {
    context: RouterContextProvider
  }
>

export type Loader<TResult, TArgs extends LoaderArgs> = (
  args: TArgs
) => Promise<TResult>
