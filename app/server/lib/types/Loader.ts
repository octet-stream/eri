import type {LoaderFunctionArgs, RouterContextProvider} from "react-router"

import type {Replace} from "./Replace.ts"

export type LoaderArgs = Replace<
  LoaderFunctionArgs,
  {
    context: RouterContextProvider
    params: any // Fixup for loader params incompatibility. But fear not: this type will be inferred as expected in-place
  }
>

export type Loader<TResult, TArgs extends LoaderArgs> = (
  args: TArgs
) => Promise<TResult>
