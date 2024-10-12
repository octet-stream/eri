import {toArray} from "../../../lib/utils/toArray.js"
import type {HttpMethods} from "../types/HttpMethods.js"

export const matchesHttpMethods = <
  TMatches extends HttpMethods | HttpMethods[]
>(
  request: Request,
  matches: TMatches
): boolean =>
  toArray(matches).some(
    method => request.method.toLowerCase() === method.toLowerCase()
  )
