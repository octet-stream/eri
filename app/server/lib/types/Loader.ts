import type {LoaderFunctionArgs} from "react-router"

export type Loader<TResult, TEvent extends LoaderFunctionArgs> = (
  event: TEvent
) => Promise<TResult>
