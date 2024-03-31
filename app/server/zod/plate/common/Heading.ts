import {z} from "zod"

import {InlineDescendant} from "./InlineDescendant.js"
import {HeadingLevels} from "./HeadingLevels.js"
import {WithId} from "./WithId.js"

export const Heading = WithId.extend({
  type: HeadingLevels,
  children: z.array(InlineDescendant).nonempty()
})

export type IHeading = z.input<typeof Heading>

export type OHeading = z.output<typeof Heading>
