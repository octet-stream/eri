import type {ComponentProps, FC} from "react"

import {cn} from "../../lib/utils/cn.js"

export interface EditorContentFallbackProps extends ComponentProps<"textarea"> {
  format?: "markdown"
}

/**
 * Renders static editor _when_ JavaScript is disabled on the client by wrapping the editor into `<noscript>` tag
 */
export const EditorContentFallback: FC<EditorContentFallbackProps> = ({
  format = "markdown",
  className,

  ...props
}) => (
  <noscript>
    <textarea
      {...props}
      className={cn(
        "w-full h-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",

        className
      )}
    />

    <input type="hidden" name="fallback" value="true" />
  </noscript>
)
