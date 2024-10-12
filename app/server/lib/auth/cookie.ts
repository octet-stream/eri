import {type CookieSerializeOptions, createCookie} from "@remix-run/node"

import type {Maybe} from "../../../lib/types/Maybe.js"

import config from "../config.js"

import {lucia} from "./lucia.js"
import {ttl} from "./ttl.js"

const cookie = createCookie(lucia.sessionCookieName, {
  secrets: config.auth.secrets
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
export const serializeCookie = (sessionId: string) =>
  cookie.serialize(sessionId, {
    ...baseSerializeOptions,

    maxAge: ttl.seconds()
  })

/**
 * Parses given `Cookie` header string. This utility supports signed cookies
 */
export const parseCookie = async (
  value: Maybe<string>
): Promise<Maybe<string>> => cookie.parse(value ?? null)

/**
 * Returns empty session cookie with maxAge set to 0.
 */
export const removeCookie = () =>
  createCookie(lucia.sessionCookieName).serialize("", {
    ...baseSerializeOptions,

    maxAge: 0
  })
