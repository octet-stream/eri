import {z} from "zod"

import {createPageInput} from "../utils/createPageInput.js"

export const PostListInput = createPageInput({maxLimit: 100})

export type IPostListInput = z.input<typeof PostListInput>

export type OPostListInput = z.output<typeof PostListInput>
