import type {ComponentPropsWithoutRef} from "react"
import {forwardRef} from "react"

import {IHeadingTypes} from "server/trpc/type/common/EditorData"

import {Heading} from "./Heading"

type Props = Omit<ComponentPropsWithoutRef<typeof Heading>, "key" | "as">

export const createHeading = (
  type: IHeadingTypes
) => forwardRef<HTMLHeadingElement, Props>((props, ref) => (
  <Heading {...props} ref={ref} as={type} />
))
