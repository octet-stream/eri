import type {LoaderFunctionArgs} from "@remix-run/node"

export type Loader<TResult> = (event: LoaderFunctionArgs) => Promise<TResult>
