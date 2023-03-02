import {TRPCError} from "@trpc/server"

import {
  UserCreateSuperInput
} from "server/trpc/type/input/UserCreateSuperInput"
import {UserOutput} from "server/trpc/type/output/UserOutput"
import {User, UserRoles} from "server/db/entity/User"
import {getORM} from "server/lib/db/orm"

import {procedure} from "server/trpc/procedure/server"

/**
 * Creates a super user account.
 * This mutation will be available only once, when there's no super user exists yet
 */
export const createSuper = procedure
  .input(UserCreateSuperInput)
  .output(UserOutput)
  .mutation(async ({input, ctx}) => {
    const orm = await getORM()

    const existent = await orm.em.findOne(
      User,

      {
        role: UserRoles.SUPER
      },

      {
        fields: ["id"]
      }
    )

    // Check presence of super user first. If exists, then throw an error and stop.
    if (existent) {
      throw new TRPCError({code: "NOT_FOUND"})
    }

    const user = orm.em.create(User, {...input, role: UserRoles.SUPER})

    await orm.em.persistAndFlush(user)
    await ctx.res.revalidate("/auth/super") // Revalidate the page to block further access to it

    return user
  })
