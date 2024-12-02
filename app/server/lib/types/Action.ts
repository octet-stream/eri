import type {ActionFunctionArgs} from "react-router"

export type Action<TResult> = (event: ActionFunctionArgs) => Promise<TResult>
