import {createPlugins} from "@udecode/plate-core"
import {createNodeIdPlugin} from "@udecode/plate"
import {v4} from "uuid"

import type {Value, Editor} from "lib/type/Editor"

export const id = createPlugins<Value, Editor>([
  createNodeIdPlugin({
    options: {
      filterText: false,

      idCreator: () => v4()
    }
  })
])
