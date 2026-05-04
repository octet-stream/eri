import type {Passkey as BAPasskey} from "@better-auth/passkey"
import {defineEntity, p} from "@mikro-orm/core"
import type {Simplify} from "../../../lib/types/Simplify.ts"
import type {EntityShape} from "../../lib/db/orm.ts"
import {Record} from "./Record.ts"
import {User} from "./User.ts"

export type DeviceType = BAPasskey["deviceType"]

type DatabasePasskey = Simplify<
  Omit<BAPasskey, "userId" | "name"> & {
    name: string | null | undefined
  }
>

export const PasskeySchema = defineEntity({
  name: "Passkey",
  extends: Record,
  properties: {
    /**
     * The name of the passkey
     */
    name: p.string().nullable(),

    /**
     * The public key of the passkey
     */
    publicKey: p.string(),

    /**
     * The unique identifier of the registered credential
     */
    credentialID: p.string(),

    /**
     * The counter of the passkey
     */
    counter: p.integer().unsigned(),

    /**
     * The type of device used to register the passkey
     */
    deviceType: p.string().$type<DeviceType>(),

    /**
     * Whether the passkey is backed up
     */
    backedUp: p.boolean(),

    /**
     * The transports used to register the passkey
     */
    transports: p.string(),

    /**
     * Authenticator's Attestation GUID indicating the type of the authenticator
     */
    aaguid: p.string().nullable(),

    /**
     * The user associated with the passkey
     */
    user: () => p.manyToOne(User).eager(true)
  } satisfies EntityShape<DatabasePasskey, keyof Record>
})

export class Passkey extends PasskeySchema.class {}

PasskeySchema.setClass(Passkey)
