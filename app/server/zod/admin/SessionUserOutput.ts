import {z} from "zod"

import {Node} from "../common/Node.js"
import {createCollectionSchema} from "../utils/createCollectionSchema.js"

import {PasskeyOutput} from "./PasskeyOutput.js"

export const SessionUserOutput = Node.extend({
  email: z.string().email(),
  passkeys: createCollectionSchema(PasskeyOutput)
})

export type ISessionUserOutput = z.input<typeof SessionUserOutput>

export type OSessionUserOutput = z.output<typeof SessionUserOutput>
