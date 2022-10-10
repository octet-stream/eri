import {useRef, useEffect} from "react"
import type {RefObject} from "react"

/**
 * Fixes the autoFocus for `<input>` and `<textarea>` elements on initial page render (when page is refreshed or rendered by server side router).
 *
 * This probably happens because of Fast Refresh, at least this comments suggests so: https://github.com/vercel/next.js/discussions/17213#discussioncomment-591492
 *
 * @param autoFocus If true, the autoFocus fix will be applied, otherwise the hook will do nothing.
 */
export const useAutoFocus = <T extends HTMLInputElement | HTMLTextAreaElement>(
  autoFocus: boolean = false
): RefObject<T> => {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (autoFocus && ref.current) {
      ref.current.focus()
      ref.current.selectionStart = ref.current.value.length // Fix cursor position within filled inputs
    }
  })

  return ref
}
