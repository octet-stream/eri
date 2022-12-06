import {createLinkPlugin} from "@udecode/plate-headless"
import {createPlugins} from "@udecode/plate-core"

import type {Value, Editor} from "lib/type/Editor"

export const link = createPlugins<Value, Editor>([
  createLinkPlugin({
    // renderAfterEditable: PlateFloatingLink
  })
])
