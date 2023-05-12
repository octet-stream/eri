import type {z} from "zod"

import {createPageInput} from "server/trpc/helper/createPageInput"

export const PostsPageInput = createPageInput({maxLimit: 100})

export type IPostPageInput = z.input<typeof PostsPageInput>

export type OPostsPageInput = z.output<typeof PostsPageInput>
