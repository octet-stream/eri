import type {ComponentPropsWithoutRef} from "react"
import {forwardRef} from "react"

import cn from "classnames"

import {IHeadingTypes} from "server/trpc/type/common/EditorData"

import {Heading} from "./Heading"

import styles from "./heading.module.css"

type Props = Omit<ComponentPropsWithoutRef<typeof Heading>, "key" | "as">

export const createHeading = (type: IHeadingTypes) => {
  const style = styles[type]

  return forwardRef<HTMLHeadingElement, Props>(({className, ...props}, ref) => (
    <Heading {...props} ref={ref} as={type} className={cn(style, className)} />
  ))
}
