import type {input, output} from "zod"

import {createPageInput} from "server/trpc/helper/createPageInput"

export const PostsPageInput = createPageInput({maxLimit: 100})

export type IPostPageInput = input<typeof PostsPageInput>

export type OPostsPageInput = output<typeof PostsPageInput>
