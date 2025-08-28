import {z} from "zod"

import {Record} from "../common/Record.ts"

export const PasskeyOutput = Record.extend({
  id: z.string().min(1), // Passkey ignores id type
  name: z.string().nullish()
})

export type IPasskeyOutput = z.input<typeof PasskeyOutput>

export type OPasskeyOutput = z.output<typeof PasskeyOutput>
