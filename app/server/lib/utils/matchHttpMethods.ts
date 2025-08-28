import {toArray} from "../../../lib/utils/toArray.ts"
import type {HttpMethods} from "../types/HttpMethods.ts"

export const matchHttpMethods = <TMatches extends HttpMethods | HttpMethods[]>(
  request: Request,
  matches: TMatches
): boolean =>
  toArray(matches).some(
    method => request.method.toLowerCase() === method.toLowerCase()
  )
