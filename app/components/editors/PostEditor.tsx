import {Plate} from "@udecode/plate-common"

import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"

import {FloatingToolbarButtons} from "../plate-ui/FloatingToolbarButtons.jsx"
import {FixedToolbarButtons} from "../plate-ui/FixedToolbarButtons.jsx"
import {FloatingToolbar} from "../plate-ui/FloatingToolbar.jsx"
import {FixedToolbar} from "../plate-ui/FixedToolbar.jsx"
import {TooltipProvider} from "../plate-ui/Tooltip.jsx"
import {Editor} from "../plate-ui/Editor.jsx"

import {plugins} from "./plugins.js"

export const PlateEditor = () => (
  <DndProvider backend={HTML5Backend}>
    <Plate plugins={plugins}>
      <TooltipProvider>
        <FixedToolbar>
          <FixedToolbarButtons />
        </FixedToolbar>

        <Editor />

        <FloatingToolbar>
          <FloatingToolbarButtons />
        </FloatingToolbar>
      </TooltipProvider>
    </Plate>
  </DndProvider>
)
