import {z} from "zod"

import {createTextType} from "../utils/createTextType.js"

export const EmptyText = createTextType(z.literal(""))

export type IEmptyText = z.input<typeof EmptyText>

export type OEmptyText = z.output<typeof EmptyText>
