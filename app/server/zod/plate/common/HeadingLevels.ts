import {HEADING_KEYS} from "@udecode/plate-heading"
import {z} from "zod"

export const ElementH1 = z.literal(HEADING_KEYS.h1)

export const ElementH2 = z.literal(HEADING_KEYS.h2)

export const ElementH3 = z.literal(HEADING_KEYS.h3)

export const ElementH4 = z.literal(HEADING_KEYS.h4)

export const ElementH5 = z.literal(HEADING_KEYS.h5)

export const ElementH6 = z.literal(HEADING_KEYS.h6)

export const HeadingLevels = z.union([
  ElementH1,
  ElementH2,
  ElementH3,
  ElementH4,
  ElementH5,
  ElementH6
])

export type IHeadingLevels = z.input<typeof HeadingLevels>

export type OHeadingLevels = z.output<typeof HeadingLevels>
