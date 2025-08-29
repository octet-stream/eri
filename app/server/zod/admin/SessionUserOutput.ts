import {z} from "zod"

import {Node} from "../common/Node.ts"
import {createCollectionSchema} from "../utils/createCollectionSchema.ts"

import {PasskeyOutput} from "./PasskeyOutput.ts"

export const SessionUserOutput = Node.extend({
  email: z.email(),
  passkeys: createCollectionSchema(PasskeyOutput)
})

export type ISessionUserOutput = z.input<typeof SessionUserOutput>

export type OSessionUserOutput = z.output<typeof SessionUserOutput>
