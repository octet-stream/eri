import {type ComponentProps, forwardRef} from "react"
import {PlateElement} from "@udecode/plate-common"
import {cva} from "class-variance-authority"
import {withVariants} from "@udecode/cn"

import type {Simplify} from "../../lib/types/Simplify.js"
import {Heading} from "../common/Heading.jsx"

const headingVariants = cva("", {
  variants: {
    isFirstBlock: {
      true: "mt-0",
      false: ""
    }
  }
})

const HeadingElementVariants = withVariants(PlateElement, headingVariants, [
  "isFirstBlock"
])

/* eslint-disable @typescript-eslint/indent */
type Props = Simplify<
  & ComponentProps<typeof Heading>
  & ComponentProps<typeof HeadingElementVariants>
>
/* eslint-enable @typescript-eslint/indent */

export const HeadingElement = forwardRef<unknown, Props>(
  ({children, ...props}, ref) => {
    const {element, editor} = props

    return (
      <HeadingElementVariants
        {...props}

        ref={ref}
        asChild
        isFirstBlock={element === editor.children[0]}
      >
        <Heading>
          {children}
        </Heading>
      </HeadingElementVariants>
    )
  }
)
