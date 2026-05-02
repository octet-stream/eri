import {defineEntity, p} from "@mikro-orm/mariadb"
import type {Verification as BAVerification} from "better-auth"
import type {EntityShape} from "../../lib/db/orm.ts"
import {Record} from "./Record.ts"

export const VerificationSchema = defineEntity({
  name: "Verification",
  extends: Record,
  properties: {
    /**
     * Unique identifier for each verification
     */
    identifier: p.string(),

    /**
     * The value to be verified
     */
    value: p.string(),

    /**
     * The time when the verification request expires
     */
    expiresAt: p.datetime()
  } satisfies EntityShape<BAVerification, keyof Record>
})

export class Verification
  extends VerificationSchema.class
  implements BAVerification {}

VerificationSchema.setClass(Verification)
