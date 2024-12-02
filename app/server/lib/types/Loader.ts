import type {LoaderFunctionArgs} from "react-router"

export type Loader<TResult> = (event: LoaderFunctionArgs) => Promise<TResult>
