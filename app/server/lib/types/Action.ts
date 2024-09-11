import type {ActionFunctionArgs} from "@remix-run/node"

export type Action<TResult> = (event: ActionFunctionArgs) => Promise<TResult>
