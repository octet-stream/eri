import {Box, withRef} from "@udecode/plate-common"
import {cva} from "class-variance-authority"
import {withVariants} from "@udecode/cn"

import type {OHeadingLevels} from "../../server/zod/plate/common/HeadingLevels.js"

const headingVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      h6: "scroll-m-20 text-base font-semibold tracking-tight"
    } satisfies Record<OHeadingLevels, string>
  }
})

const HeadingElementVariants = withVariants(Box, headingVariants, ["variant"])

/**
 * Common heading component.
 *
 * Renders specific tag depending on the `variant` property
 */
export const Heading = withRef<typeof HeadingElementVariants>(
  ({variant, children, ...props}, ref) => {
    const Element = variant || "h1"

    return (
      <HeadingElementVariants {...props} ref={ref} variant={variant} asChild>
        <Element>{children}</Element>
      </HeadingElementVariants>
    )
  }
)

Heading.displayName = "Heading"
