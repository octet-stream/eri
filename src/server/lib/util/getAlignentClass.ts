import styles from "style/align.module.css"

import type {OAlignment} from "server/trpc/type/common/EditorData"

export const getAlignentClass = (alignment: OAlignment = "left") => (
  styles[alignment] ?? styles.left
)
