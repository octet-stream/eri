import type {CookieSerializeOptions} from "cookie"
import type {CookieOption} from "next-auth"
import {serialize} from "cookie"

export interface Cookie extends CookieOption {
  value: string
}

// Most of the browsers support at least this size per cookie
const MAX_COOKIE_SIZE = 4096

const getEmptyCookieSize = (
  name: string,
  options: CookieSerializeOptions
): number => new TextEncoder().encode(serialize(name, "", options)).byteLength

export function* chunk(cookie: Cookie): Generator<Cookie, void> {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  const value = encoder.encode(cookie.value)
  const COOKIE_SIZE = encoder
    .encode(serialize(cookie.name, cookie.value, cookie.options))
    .byteLength

  // If the whole cookie size is within CHUNK_SIZE, just return it as is
  if (COOKIE_SIZE <= MAX_COOKIE_SIZE) {
    yield cookie

    return
  }

  // Need to test this code
  let chunkNumber = 0
  let offset = value.byteOffset
  while (offset < COOKIE_SIZE) {
    const name = `${cookie.name}.${chunkNumber++}`
    const EMPTY_COOKIE_SIZE = getEmptyCookieSize(name, cookie.options)
    const CHUNK_SIZE = MAX_COOKIE_SIZE - EMPTY_COOKIE_SIZE

    const chunk = value.buffer.slice(
      offset,

      Math.min(COOKIE_SIZE - offset, CHUNK_SIZE)
    )

    yield {...cookie, name, value: decoder.decode(chunk)}

    offset += chunk.byteLength
  }
}
