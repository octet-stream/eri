import {router, TRPCError} from "@trpc/server"
import {z} from "zod"

import type {GlobalContext} from "server/trpc/context"

import {
  UserCreateSuperInput
} from "server/trpc/type/input/UserCreateSuperInput"
import {User, UserRoles} from "server/db/entity/User"
import {getORM} from "server/lib/db"

import ssrContextCheck from "server/trpc/middleware/ssrContextCheck"

/**
 * Creates a super user account.
 * This mutation will be available only once, when there's no super user exists yet
 */
const userCreateSuper = router<GlobalContext>()
  .middleware(ssrContextCheck)
  .mutation("createSuper", {
    input: UserCreateSuperInput,

    output: z.instanceof(User),

    async resolve({ctx, input}) {
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

export default userCreateSuper
