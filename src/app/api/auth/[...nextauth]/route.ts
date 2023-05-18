import type {CookieSerializeOptions} from "cookie"
import type {NextAuthOptions} from "next-auth"
import NextAuth from "next-auth"

import CredentialsProvider from "next-auth/providers/credentials"

import {serverAddress} from "lib/util/serverAddress"

import {getORM} from "server/lib/db/orm"

import {User} from "server/db/entity/User"
import {UserOutput} from "server/trpc/type/output/UserOutput"

const COOKIE_PREFIX = "eri"

const getCookieName = (name: string) => `${COOKIE_PREFIX}.${name}`

export const getCookieOptions = (): CookieSerializeOptions => ({
  httpOnly: true,
  sameSite: "lax",
  path: "/",
  secure: new URL(serverAddress).protocol === "https:"
})

export const COOKIE_NAME_SESSION = getCookieName("sid")

export const COOKIE_NAME_CALLBACK = getCookieName("callback")

export const COOKIE_NAME_CSRF = getCookieName("csrf")

export const COOKIE_NAME_PKCE_CODE_VERIFIER = getCookieName(
  "pkce.code_verifier"
)

export const COOKIE_NAME_STATE = getCookieName("state")

export const options: NextAuthOptions = {
  debug: process.env.NODE_ENV !== "production",
  pages: {
    signIn: "/auth/login"
  },
  session: {
    strategy: "jwt"
  },
  cookies: {
    sessionToken: {
      name: COOKIE_NAME_SESSION,
      options: getCookieOptions()
    },
    callbackUrl: {
      name: COOKIE_NAME_CALLBACK,
      options: getCookieOptions()
    },
    csrfToken: {
      name: COOKIE_NAME_CSRF,
      options: getCookieOptions()
    },
    pkceCodeVerifier: {
      name: COOKIE_NAME_PKCE_CODE_VERIFIER,
      options: getCookieOptions()
    },
    state: {
      name: COOKIE_NAME_STATE,
      options: getCookieOptions()
    }
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email"
        },
        password: {
          label: "Password",
          type: "password"
        }
      },

      async authorize(credentials) {
        if (!credentials) {
          return null
        }

        const orm = await getORM()

        const user = await orm.em.findOne(
          User,

          {
            email: credentials.email
          },

          {
            disableIdentityMap: true
          }
        )

        if (!user) {
          throw new Error("Can't find a user.")
        }

        if (!(await user.isPasswordValid(credentials.password))) {
          throw new Error("Invalid password.")
        }

        return UserOutput.parseAsync(user)
      }
    })
  ],
  callbacks: {
    async session({session, token}) {
      const orm = await getORM()

      const user = await orm.em.findOneOrFail(User, {id: token.sub}, {
        disableIdentityMap: true
      })

      return {
        ...session,

        user: await UserOutput.parseAsync(user)
      }
    }
  }
}

const handler = NextAuth(options)

export const GET = handler

export const POST = handler
