import type {HttpMethods} from "../types/HttpMethods.js"
import {toArray} from "../../../lib/utils/toArray.js"

export const matchesHttpMethods = <
  TMatches extends HttpMethods | HttpMethods[]
>(
  request: Request,
  matches: TMatches
): boolean =>
  toArray(matches).some(
    method => request.method.toLowerCase() === method.toLowerCase()
  )
