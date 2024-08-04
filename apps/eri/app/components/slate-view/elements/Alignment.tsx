import {cva, VariantProps} from "class-variance-authority"
import {Slot} from "@radix-ui/react-slot"
import {forwardRef, type ReactNode} from "react"
import {cn} from "@udecode/cn"

const alignmentVariants = cva("", {
  variants: {
    align: {
      left: "text-left",
      center: "text-right",
      justify: "text-justify",
      right: "text-right"
    }
  }
})

export interface AlignmentProps extends VariantProps<typeof alignmentVariants> {
  asChild?: boolean
  className?: string
  children?: ReactNode
}

export const Alignment = forwardRef<any, AlignmentProps>(
  ({asChild, className, align, children, ...props}, ref) => {
    const Element = asChild ? Slot : "div"

    return (
      <Element
        {...props}

        ref={ref}
        className={cn(alignmentVariants({align, className}))}
      >
        {children}
      </Element>
    )
  }
)
