import {router, TRPCError} from "@trpc/server"
import {z} from "zod"

import type {Context} from "server/trpc/context"

import {UserCreateInput} from "server/trpc/type/input/UserCreateInput"
import {User, InvitationCode} from "server/db/entity"
import {getORM} from "server/lib/db"

const userCreate = router<Context>()
  .mutation("create", {
    input: UserCreateInput,

    output: z.instanceof(User),

    async resolve({input}) {
      const {code, ...fields} = input

      const orm = await getORM()
      const invitation = await orm.em.findOne(InvitationCode, {code})

      if (!invitation) {
        throw new TRPCError({
          message: "Invalid invitation code",
          code: "BAD_REQUEST"
        })
      }

      const existent = await orm.em.findOne(User, {email: invitation.email})

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
    }
  })

export default userCreate
