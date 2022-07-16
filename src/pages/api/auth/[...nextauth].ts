import type {NextApiRequest, NextApiResponse} from "next"
import type {NextAuthOptions} from "next-auth"
import {createRouter} from "next-connect"

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import withORMContext from "server/middleware/withORMContext"

import {getORM} from "server/lib/db"
import {User} from "server/db/entity/User"

export const options: NextAuthOptions = {
  debug: process.env.NODE_ENV !== "production",
  pages: {
    signIn: "/auth/login"
  },
  session: {
    strategy: "jwt"
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
        const userRepo = orm.em.getRepository(User)

        const user = await userRepo.findOne({email: credentials.email})

        if (!user) {
          throw new Error("Can't find a user.")
        }

        if (!(await user.isPasswordValid(credentials.password))) {
          throw new Error("Invalid password.")
        }

        // TODO: Improve session serialization
        return {
          id: user.id,
          login: user.login,
          email: null,
          image: null,
          name: null
        }
      }
    })
  ]
}

const authHandler = NextAuth(options)

const chain = createRouter<NextApiRequest, NextApiResponse>()

chain
  .use(withORMContext)
  .all(authHandler)

export default chain.handler()