import type {ComponentPropsWithoutRef} from "react"
import {forwardRef} from "react"

import cn from "clsx"

import type {HeadingTypes} from "./Heading"
import {Heading} from "./Heading"

type Props = Omit<ComponentPropsWithoutRef<typeof Heading>, "key" | "as">

export const createHeading = (
  type: HeadingTypes
) => forwardRef<HTMLHeadingElement, Props>(({className, ...props}, ref) => (
  <Heading
    {...props}
    ref={ref}
    as={type}
    className={cn("dark:text-white", className)}
  />
))
