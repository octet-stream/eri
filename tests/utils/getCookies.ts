import {type SetCookie, parseSetCookie} from "cookie-es"

export function getCookies(headers: Headers): Map<string, SetCookie> {
  const cookies = new Map<string, SetCookie>()

  headers
    .getSetCookie()
    .map(cookie => parseSetCookie(cookie))
    .forEach(cookie => cookies.set(cookie.name, cookie))

  return cookies
}
