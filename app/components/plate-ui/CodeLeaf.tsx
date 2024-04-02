import {PlateLeaf} from "@udecode/plate-common"
import {cn, withRef} from "@udecode/cn"

export const CodeLeaf = withRef<typeof PlateLeaf>(
  ({className, children, ...props}, ref) => (
    <PlateLeaf
      ref={ref}
      asChild
      className={cn(
        "whitespace-pre-wrap rounded-md bg-muted px-[0.3em] py-[0.2em] font-mono text-sm",
        className
      )}
      {...props}
    >
      <code>{children}</code>
    </PlateLeaf>
  )
)
