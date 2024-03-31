import {z} from "zod"

import {createTextType} from "../utils/createTextType.js"

export const PlainText = createTextType(z.string())

export type IPlainText = z.input<typeof PlainText>

export type OPlainText = z.output<typeof PlainText>
