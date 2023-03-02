import type {infer as Infer} from "zod"

import {Node} from "server/trpc/type/common/Node"

import {PostCreateInput} from "./PostCreateInput"

export const PostUpdateInput = PostCreateInput.partial().extend(Node.shape)

export type TPostUpdateInput = Infer<typeof PostUpdateInput>
