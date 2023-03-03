import type {Value} from "@udecode/plate"

import isEmpty from "lodash/isEmpty"

import {isEmptyTextChild} from "./isEmptyTextChild"

/**
 * Checks if Editor content is empty
 *
 * @param value
 */
export const isEditorContentEmpty = (value: Value): boolean => {
  if (isEmpty(value)) {
    return true
  }

  return isEmptyTextChild(value)
}

export default isEditorContentEmpty
