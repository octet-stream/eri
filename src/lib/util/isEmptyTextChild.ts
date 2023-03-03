import {ELEMENT_PARAGRAPH} from "@udecode/plate-headless"
import type {Value} from "@udecode/plate"

export const isEmptyTextChild = (value: Value): boolean => value.every(
  node => node.type === ELEMENT_PARAGRAPH
    && node.children.length === 1
    && node.children[0].text === ""
)
