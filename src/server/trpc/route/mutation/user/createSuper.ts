import {router, TRPCError} from "@trpc/server"
import {z} from "zod"

import type {GlobalContext} from "server/trpc/context"
import {isSSRContext} from "server/trpc/context"

import {
  UserCreateSuperInput
} from "server/trpc/type/input/UserCreateSuperInput"
import {User, UserRoles} from "server/db/entity/User"
import {getORM} from "server/lib/db"

export default router<GlobalContext>()
  .mutation("createSuper", {
    input: UserCreateSuperInput,

    output: z.instanceof(User),

    async resolve({ctx, input}) {
      if (!isSSRContext(ctx)) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "SSRContext required for this operation"
        })
      }

      const orm = await getORM()
      const existent = await orm.em.findOne(User, {role: UserRoles.SUPER})

      // Check presence of super user first. If exists, then throw an error and stop.
      if (existent) {
        throw new TRPCError({code: "NOT_FOUND"})
      }

      const user = orm.em.create(User, {...input, role: UserRoles.SUPER})

      await orm.em.persistAndFlush(user)
      await ctx.res.revalidate("/auth/super") // Revalidate the page to block further access to it

      return user
    }
  })
