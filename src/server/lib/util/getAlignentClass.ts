import styles from "style/align.module.css"

import type {TAlignment} from "server/trpc/type/common/EditorData"

export const getAlignentClass = (alignment: TAlignment = "left") => (
  styles[alignment] ?? styles.left
)
