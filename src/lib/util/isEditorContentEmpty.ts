import {ELEMENT_PARAGRAPH} from "@udecode/plate"
import type {Value} from "@udecode/plate"
import {isEmpty} from "lodash"

/**
 * Checks if Editor content is empty
 *
 * @param value
 */
const isEditorContentEmpty = (value: Value): boolean => {
  if (isEmpty(value)) {
    return true
  }

  if (
    value.length === 1
      && value[0].type === ELEMENT_PARAGRAPH
      && value[0].children.length === 1
      && value[0].children[0].text === ""
  ) {
    return true
  }

  return false
}

export default isEditorContentEmpty
