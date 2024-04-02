/* eslint-disable jsx-a11y/anchor-is-valid */ // Disabled because false-positive (PlateElement has asChild prop)

import {PlateElement, useElement} from "@udecode/plate-common"
import {TLinkElement, useLink} from "@udecode/plate-link"
import {withRef} from "@udecode/cn"

import {Link} from "../common/Link.jsx"

export const LinkElement = withRef<typeof PlateElement>(
  ({children, ...props}, ref) => {
    const element = useElement<TLinkElement>()
    const {props: linkProps} = useLink({element})

    return (
      <PlateElement
        ref={ref}
        asChild
        {...(linkProps as any)}
        {...props}
      >
        <Link>
          {children}
        </Link>
      </PlateElement>
    )
  }
)
