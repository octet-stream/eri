import {forwardRef, useMemo, createElement} from "react"
import type {ComponentPropsWithoutRef} from "react"

import Link from "next/link"

import {isInternalUrl} from "lib/util/isInternalUrl"

interface Props extends ComponentPropsWithoutRef<"a"> {
  href: string
}

/**
 * Abstract Anchor component.
 * Will automatically render `next/link` for internal URL and `<a>` for external.
 *
 * ```tsx
 * import type {FC} from "react"
 * import {Fragment} from "react"
 * import {Anchor} from "component/Anchor"
 *
 * // Assume our internal base URL is https://example.com, then the first link will be `next/link` component and the other will be `<a>` tag
 * const MyComponent: FC = () => (
 *   <Fragment>
 *     <Anchor href="https://example.com">
 *       Internal link
 *     </Anchor>
 *
 *     <Anchor href="https://external-site.com">
 *       External link
 *     </Anchor>
 *   </Fragment>
 * )
 * ```
 */
export const Anchor = forwardRef<HTMLAnchorElement, Props>((props, ref) => {
  const isInternal = useMemo(() => isInternalUrl(props.href), [props.href])

  const renderProps: Props = isInternal
    ? props
    : {...props, target: "_blank", rel: "noopener noreferrer"}

  return createElement(isInternal ? Link : "a", {...renderProps, ref})
})
