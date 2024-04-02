import {PlateElement} from "@udecode/plate-common"
import {withRef, withVariants} from "@udecode/cn"
import {cva} from "class-variance-authority"

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

export const HeadingElement = withRef<typeof HeadingElementVariants>(
  ({children, ...props}, ref) => {
    const {element, editor} = props

    return (
      <HeadingElementVariants
        ref={ref}
        asChild
        isFirstBlock={element === editor.children[0]}
        {...props}
      >
        <Heading>
          {children}
        </Heading>
      </HeadingElementVariants>
    )
  }
)
