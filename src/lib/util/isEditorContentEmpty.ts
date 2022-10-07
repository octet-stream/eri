import {ELEMENT_PARAGRAPH} from "@udecode/plate"
import type {Value} from "@udecode/plate"
import {isEmpty} from "lodash"

/**
 * Checks if Editor content is empty
 *
 * @param value
 */
export const isEditorContentEmpty = (value: Value): boolean => {
  if (isEmpty(value)) {
    return true
  }

  return value.every(
    node => node.type === ELEMENT_PARAGRAPH
      && node.children.length === 1
      && node.children[0].text === ""
  )
}

export default isEditorContentEmpty
