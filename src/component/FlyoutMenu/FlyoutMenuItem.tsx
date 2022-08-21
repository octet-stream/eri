import type {FC, ReactNode} from "react"
import {Menu} from "@headlessui/react"

import cn from "classnames"

import {Anchor} from "component/Anchor"

interface Props {
  href?: string
  className?: string
  children?: ReactNode
}

/**
 * Renders a single element in FlyoutMenu.
 */
export const FlyoutMenuItem: FC<Props> = ({href, children, className}) => {
  const isLink = href != null

  return (
    <Menu.Item>
      {({active}) => (
        isLink ? (
          <Anchor
            href={href}
            className={cn("not-prose block text-black font-normal cursor-pointer px-6 py-2 w-full text-left no-underline", {"bg-violet-400 !text-white": active}, className)}
          >
            {children}
          </Anchor>
        ) : (
          <button
            type="button"
            className={cn("cursor-pointer px-6 py-2 w-full text-left", {"bg-violet-400 text-white": active}, className)}
          >
            {children}
          </button>
        )
      )}
    </Menu.Item>
  )
}
