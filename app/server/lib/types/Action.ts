import type {ActionFunctionArgs} from "react-router"

export type Action<TResult, TEvent extends ActionFunctionArgs> = (
  event: TEvent
) => Promise<TResult>
