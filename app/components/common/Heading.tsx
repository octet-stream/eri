import {Box, withRef} from "@udecode/plate-common"
import {cva} from "class-variance-authority"
import {withVariants} from "@udecode/cn"

import {
  OHeadingLevels
} from "../../server/zod/plate/common/HeadingLevels.js"

const headingVariants = cva("", {
  variants: {
    variant: {
      h1: "mb-1 mt-[2em] font-heading text-4xl font-bold",
      h2: "mb-px mt-[1.4em] font-heading text-2xl font-semibold tracking-tight",
      h3: "mb-px mt-[1em] font-heading text-xl font-semibold tracking-tight",
      h4: "mt-[0.75em] font-heading text-lg font-semibold tracking-tight",
      h5: "mt-[0.75em] text-lg font-semibold tracking-tight",
      h6: "mt-[0.75em] text-base font-semibold tracking-tight"
    } satisfies Record<OHeadingLevels, string>
  }
})

const HeadingElementVariants = withVariants(Box, headingVariants, [
  "variant"
])

/**
 * Common heading component.
 *
 * Renders specific tag depending on the `variant` property
 */
export const Heading = withRef<typeof HeadingElementVariants>(
  ({variant, children, ...props}, ref) => {
    const Element = variant ?? "h1"

    return (
      <HeadingElementVariants
        {...props}

        ref={ref}
        variant={variant}
        asChild
      >
        <Element>
          {children}
        </Element>
      </HeadingElementVariants>
    )
  }
)

Heading.displayName = "Heading"
