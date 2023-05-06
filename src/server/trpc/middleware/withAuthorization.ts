import {getServerSession} from "next-auth/next"
import {TRPCError} from "@trpc/server"

import {options} from "app/api/auth/[...nextauth]/route"

import {getORM} from "server/lib/db/orm"
import {User} from "server/db/entity"

import {withFetchCotext} from "./withFetchCotext"

export const withAuthorization = withFetchCotext.unstable_pipe(
  async ({ctx, next}) => {
    const session = await getServerSession(options)

    if (!session) {
      throw new TRPCError({code: "UNAUTHORIZED"})
    }

    const orm = await getORM()

    const user = await orm.em.findOne(User, {id: (session.user as any).id})

    if (!user) {
      throw new TRPCError({code: "UNAUTHORIZED"})
    }

    return next({ctx: {...ctx, session, user}})
  }
)
