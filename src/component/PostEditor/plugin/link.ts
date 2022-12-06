import {createLinkPlugin} from "@udecode/plate-headless"
import {createPlugins} from "@udecode/plate-core"

import type {Value, Editor} from "lib/type/Editor"

import {Link} from "../element/Link"

export const link = createPlugins<Value, Editor>([
  createLinkPlugin({
    component: Link
    // renderAfterEditable: PlateFloatingLink
  })
])
