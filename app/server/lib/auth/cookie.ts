import {createCookie, type CookieSerializeOptions} from "@remix-run/node"

import type {MaybeNull} from "../../../lib/types/MaybeNull.js"

import {lucia} from "./lucia.js"
import {ttl} from "./ttl.js"

const cookie = createCookie(lucia.sessionCookieName, {
  // TODO: Add zod validation for AUTH_SECRET parameter and make it required
  secrets: process.env.AUTH_SECRET ? [process.env.AUTH_SECRET] : undefined
})

const baseSerializeOptions: Omit<CookieSerializeOptions, "maxAge"> = {
  path: "/",
  sameSite: "lax",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production"
}

/**
 * Creates signed session cookie. Use it instead of `lucia.createSessionCookie`
 */
export const serializeCookie = (
  sessionId: string
) => cookie.serialize(sessionId, {
  ...baseSerializeOptions,

  maxAge: ttl.seconds()
})

/**
 * Parses given `Cookie` header string. This utility supports signed cookies
 */
export const parseCookie = (
  value: MaybeNull<string>
): Promise<MaybeNull<string>> => cookie.parse(value)

/**
 * Returns empty session cookie with maxAge set to 0.
 */
export const removeCookie = () => createCookie(lucia.sessionCookieName)
  .serialize("", {
    ...baseSerializeOptions,

    maxAge: 0
  })
