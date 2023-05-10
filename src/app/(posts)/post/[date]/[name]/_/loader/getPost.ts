import {TRPCError} from "@trpc/server"

import {createCaller} from "lib/trpc/server"

import type {Params} from "../../page"

export const getPost = createCaller(
  async (trpc, params: Params) => {
    try {
      return await trpc.post.getBySlug({
        slug: params
      })
    } catch (error) {
      // Re-throw BAD_REQUEST error as it's likely caused by Zod parse errors
      if (error instanceof TRPCError && error.code === "BAD_REQUEST") {
        throw new TRPCError({code: "NOT_FOUND", cause: error})
      }

      throw error
    }
  }
)
