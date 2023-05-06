import type {Value} from "@udecode/plate"

export const isEmptyTextChild = (value: Value): boolean => value.every(
  node => node.type === "p"
    && node.children.length === 1
    && node.children[0].text === ""
)
