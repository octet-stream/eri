import type {UrlObject} from "node:url"

import type {ComponentPropsWithoutRef, ComponentProps} from "react"
import {forwardRef, useMemo} from "react"

import cn from "clsx"
import Link from "next/link"

import {isInternalUrl} from "lib/util/isInternalUrl"
import type {Replace} from "lib/type/Replace"

import {ExternalAnchor} from "./ExternalAnchor"

type Props = Replace<ComponentPropsWithoutRef<"a">, {
  href: Exclude<ComponentProps<typeof Link>["href"], UrlObject> | string
}>

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
export const Anchor = forwardRef<HTMLAnchorElement, Props>(({
  className,
  href,

  ...props
}, ref) => {
  const LinkCompoent = useMemo(
    () => isInternalUrl(href) ? Link : ExternalAnchor,

    [href]
  )

  return (
    <LinkCompoent
      {...props}

      ref={ref}
      href={href as any}
      className={cn("text-violet-500 dark:text-violet-400 no-underline hover:underline", className)}
    />
  )
})
