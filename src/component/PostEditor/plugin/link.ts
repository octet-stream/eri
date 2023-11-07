import {PlateFloatingLink} from "@udecode/plate-ui-link"
import {createLinkPlugin} from "@udecode/plate-headless"
import {createPlugins} from "@udecode/plate-core"

import type {LinkPlugin} from "@udecode/plate-headless"

import type {Value, Editor} from "lib/type/Editor"

import {Link} from "../element/Link"

export const link = createPlugins<Value, Editor>([
  createLinkPlugin<LinkPlugin, Value, Editor>({
    component: Link as any,
    renderAfterEditable: PlateFloatingLink as any // TODO: Replace with custom UI element
  })
])
