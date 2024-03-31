import {createCookie} from "@remix-run/node"

import type {MaybeNull} from "../../../lib/types/MaybeNull.js"

import {lucia} from "./lucia.js"
import {ttl} from "./ttl.js"

const cookie = createCookie(lucia.sessionCookieName, {
  // TODO: Add zod validation for AUTH_SECRET parameter and make it required
  secrets: process.env.AUTH_SECRET ? [process.env.AUTH_SECRET] : undefined
})

/**
 * Creates signed session cookie. Use it instead of `lucia.createSessionCookie`
 */
export const serializeCookie = (
  sessionId: string
) => cookie.serialize(sessionId, {
  path: "/",
  sameSite: "lax",
  httpOnly: true,
  maxAge: ttl.seconds(),
  secure: process.env.NODE_ENV === "production"
})

/**
 * Parses given `Cookie` header string. This utility supports signed cookies
 */
export const parseCookie = (
  value: MaybeNull<string>
): Promise<MaybeNull<string>> => cookie.parse(value)
