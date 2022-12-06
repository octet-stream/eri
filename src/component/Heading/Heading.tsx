import {forwardRef, createElement} from "react"
import type {
  ReactNode,
  ComponentPropsWithoutRef
} from "react"

import {IHeadingTypes} from "server/trpc/type/common/EditorData"

interface Props extends ComponentPropsWithoutRef<"h2"> {
  as: IHeadingTypes,
  children?: ReactNode
  className?: string
}

export const Heading = forwardRef<HTMLHeadingElement, Props>((
  {
    as,
    children,

    ...props
  },

  ref
) => createElement(as, {...props, ref}, children))
