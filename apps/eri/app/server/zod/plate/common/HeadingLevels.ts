import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6
} from "@udecode/plate-heading"
import {z} from "zod"

export const ElementH1 = z.literal(ELEMENT_H1)

export const ElementH2 = z.literal(ELEMENT_H2)

export const ElementH3 = z.literal(ELEMENT_H3)

export const ElementH4 = z.literal(ELEMENT_H4)

export const ElementH5 = z.literal(ELEMENT_H5)

export const ElementH6 = z.literal(ELEMENT_H6)

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
