import {TRPCError} from "@trpc/server"

import {UserCreateInput} from "server/trpc/type/input/UserCreateInput"
import {UserOutput} from "server/trpc/type/output/UserOutput"
import {User, InvitationCode} from "server/db/entity"
import {getORM} from "server/lib/db"

import {procedure} from "server/trpc/procedure/server"

/**
 * Creates a new regular user account
 */
export const create = procedure
  .input(UserCreateInput)
  .output(UserOutput)
  .mutation(async ({input}) => {
    const {code, ...fields} = input

    const orm = await getORM()
    const invitation = await orm.em.findOne(InvitationCode, {code})

    if (!invitation) {
      throw new TRPCError({
        message: "Invalid invitation code",
        code: "BAD_REQUEST"
      })
    }

    const existent = await orm.em.findOne(
      User,

      {
        email: invitation.email
      },

      {
        fields: ["id"]
      }
    )

    // If there's a user that matched the email from invitation code, then throw an error and stop
    if (existent) {
      throw new TRPCError({
        message: "User already exists",
        code: "BAD_REQUEST"
      })
    }

    // If input email does not match invitation email, then throw an error and stop
    if (input.email !== invitation.email) {
      throw new TRPCError({
        message: "Email mismatch",
        code: "BAD_REQUEST"
      })
    }

    const user = orm.em.create(User, fields)

    orm.em.persist(user)
    orm.em.remove(invitation)

    await orm.em.flush()

    return user
  })
