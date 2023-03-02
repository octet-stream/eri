import type {infer as Infer} from "zod"

import {createPageInput} from "server/trpc/helper/createPageInput"

export const PostsPageInput = createPageInput({maxLimit: 100})

export type TPostsPageInput = Infer<typeof PostsPageInput>
