import {cva, type VariantProps} from "class-variance-authority"
import type {ComponentProps, FC} from "react"

import {cn} from "../../lib/utils/cn.ts"

export type HeadingLevels = `h${1 | 2 | 3 | 4 | 5 | 6}`

export const headingVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance",
      h2: "mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
      h3: "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      h6: "scroll-m-20 text-base font-semibold tracking-tight"
    } satisfies Record<HeadingLevels, string>
  }
})

export interface HeadingProps
  extends ComponentProps<"h1">,
    VariantProps<typeof headingVariants> {}

/**
 * Common heading component.
 *
 * Renders specific tag depending on the `variant` property
 */
export const Heading: FC<HeadingProps> = ({
  variant,
  className,
  children,
  ...props
}) => {
  const Element = variant || "h1"

  return (
    <Element {...props} className={cn(headingVariants({variant}), className)}>
      {children}
    </Element>
  )
}

Heading.displayName = "Heading"
