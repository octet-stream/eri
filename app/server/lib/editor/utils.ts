import {Fragment, type Node} from "@tiptap/pm/model"

/**
 * Returns documet's title node
 */
export function getPostTitle(document: Node): Node {
  const title = document.firstChild

  if (!title?.textContent) {
    throw new Error("Unable to extract title from given document node")
  }

  return title
}

/**
 * Returns document's content
 */
export const getPostContent = (document: Node): Node =>
  document.copy(Fragment.fromArray(document.children.slice(1)))

interface NormalizePostDocumentResult {
  /**
   * Whole document node (same as the input)
   */
  document: Node

  /**
   * Document's title
   */
  title: Node

  /**
   * Document without title
   */
  content: Node
}

/**
 * Extracts `title` and `content` from given `document`, and returns them alongside with the document itself
 */
export function normalizePostDocument(
  document: Node
): NormalizePostDocumentResult {
  const title = getPostTitle(document)
  const content = getPostContent(document)

  return {
    document,
    title,
    content
  }
}
