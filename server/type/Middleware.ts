import {ServerResponse} from "http"

import {ApiContextRequest} from "./Context"

export interface NextMiddleware<E extends Error = Error> {
  (error?: E): Promise<void> | void
}

export interface Middleware<
  Q extends ApiContextRequest = ApiContextRequest,
  R extends ServerResponse = ServerResponse
> {
  (req: Q, res: R, next: NextMiddleware): Promise<void> | void
}

export default Middleware
