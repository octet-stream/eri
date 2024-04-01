import {PlateElement} from "@udecode/plate-common"
import {cn, withRef} from "@udecode/cn"

export const BlockquoteElement = withRef<typeof PlateElement>(
  ({className, children, ...props}, ref) => (
    <PlateElement
      ref={ref}
      asChild
      className={cn("my-1 border-l-2 pl-6 italic", className)}
      {...props}
    >
      <blockquote>
        {children}
      </blockquote>
    </PlateElement>
  )
)
