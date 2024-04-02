import {Children, cloneElement} from "react"
import {cn} from "@udecode/cn"
import {
  createNodeHOC,
  createNodesHOC,
  PlaceholderProps,
  usePlaceholderState
} from "@udecode/plate-common"
import {ELEMENT_H1} from "@udecode/plate-heading"
import {ELEMENT_PARAGRAPH} from "@udecode/plate-paragraph"

export const Placeholder = (props: PlaceholderProps) => {
  const {children, placeholder, nodeProps} = props

  const {enabled} = usePlaceholderState(props)

  return Children.map(children, child => cloneElement(child, {
    className: child.props.className,
    nodeProps: {
      ...nodeProps,
      className: cn(
        enabled
            && "before:absolute before:cursor-text before:opacity-30 before:content-[attr(placeholder)]"
      ),
      placeholder
    }
  }))
}

export const withPlaceholder = createNodeHOC(Placeholder)
export const withPlaceholdersPrimitive = createNodesHOC(Placeholder)

export const withPlaceholders = (
  components: unknown
) => withPlaceholdersPrimitive(components, [
  {
    key: ELEMENT_PARAGRAPH,
    placeholder: "Type a paragraph",
    hideOnBlur: true,
    query: {
      maxLevel: 1
    }
  },
  {
    key: ELEMENT_H1,
    placeholder: "Untitled",
    hideOnBlur: false
  }
])
